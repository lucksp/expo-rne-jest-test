import { useNavigationContainerRef } from '@react-navigation/core';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as SecureStore from 'expo-secure-store';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { Alert, AppState } from 'react-native';

import { post, put } from '@/src/helpers/api';
import type { RootStackParamList } from '@/src/router/rootStackParams';

import { ApiPath } from '../../routes';
import { reducer } from './reducer';
import {
  AuthContextType,
  CreateAccountData,
  LoginResponse,
  ResendCodeResponse,
  SignInTypes,
  SSKey,
  VerifyPhoneResponse,
} from './types';
export { SSKey, State, AuthContextType, SignInTypes, UserLocation } from './types';

export const parseJwt = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
};


const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialState = {
  isLoading: true,
  isSignedOut: true,
  error: undefined,
  newUser: null,
  userLocation: null,
  userToken: null,
  user: null,
  verifyPhone: null,
};

export const AuthContextProvider = ({ children }: {children: ReactNode}) => {
  const navigationRef = useNavigationContainerRef<RootStackParamList>();
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log('AuthContext State: ', state);

  const authActions = useMemo(
    () => ({
      createAccount: async ({ newUser, uuid }: CreateAccountData) => {
        try {
          const body = {
            user: newUser,
            invitationUUID: uuid,
            role: 'LT',
          };

          const response = await post<LoginResponse>({
            path: ApiPath.LOGIN,
            body,
            authState: state,
            pushError: () => null
          });

          if (response?.messages) {
            dispatch({
              type: 'CREATE_ACCOUNT',
              data: null,
              token: null,
              error: response?.messages.join(' - '),
            });
          } else {
            dispatch({
              type: 'CREATE_ACCOUNT',
              data: response?.user || null,
              token: response?.token || null,
              error: undefined,
            });

            await SecureStore.setItemAsync(SSKey.UserToken, response?.token as string);
            await SecureStore.setItemAsync(SSKey.API, Constants?.manifest?.extra?.api);
          }
        } catch (error) {
          console.error(error);
          throw new Error(typeof error === 'string' ? error : JSON.stringify(error));
        }
      },
      setUserLocation: async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          // ToDo: handle this error how?
          return;
        }

        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.BestForNavigation,
        });
        dispatch({
          type: 'USER_LOCATION',
          data: location,
        });
      },

      signIn: async ({ email, password, remember }: SignInTypes) => {
        try {
          const loginBody = {
            username: email,
            password,
            remember,
          };
          const loginResponse = await post<LoginResponse>({
            path: 'api/login',
            body: loginBody,
            authState: state,
            pushError: () => null,
          });

          if (loginResponse?.status !== 'success' || !loginResponse?.data) {
            throw new Error('failed login');
          }
          // everything 👍 - set store + update state
          await SecureStore.setItemAsync(SSKey.UserToken, JSON.stringify(loginResponse.data.token));
          await SecureStore.setItemAsync(SSKey.API, Constants?.manifest?.extra?.api);
          await SecureStore.setItemAsync(SSKey.UserInfo, JSON.stringify(loginResponse.data.user));
          await SecureStore.setItemAsync(SSKey.UserCredentials, JSON.stringify(loginBody));
          dispatch({ type: 'SIGN_IN', data: loginResponse.data });
          // TODO - what is payload?
          // dispatch({ type: 'VERIFY_PHONE', data: response.data });
        } catch (error) {
          console.error(error);
          throw new Error(typeof error === 'string' ? error : JSON.stringify(error));
        }
      },

      signOut: async () => {
        // 🛑 TODO: post to logout endpoint
        await SecureStore.deleteItemAsync(SSKey.UserToken);
        await SecureStore.deleteItemAsync(SSKey.API);
        await SecureStore.deleteItemAsync(SSKey.UserInfo);
        await SecureStore.deleteItemAsync(SSKey.UserCredentials);

        dispatch({ type: 'SIGN_OUT' });
      },

      resendCode: async (): Promise<void> => {
        try {
          const response = await post<ResendCodeResponse>({
            path: ApiPath.USERS_SENDPHONEVERIFICATION,
            authState: state,
            pushError: () => null,
          });

          if (response?.status !== 'success') {
            return Alert.alert('Error', response?.message?.[0], [{ text: 'OK' }]);
          } else {
            return Alert.alert('Success!', response?.messages?.[0], [{ text: 'OK' }]);
          }
        } catch (e) {
          throw new Error(typeof e === 'string' ? e : JSON.stringify(e));
        }
      },

      verifyPhoneNumber: async (code: string): Promise<void> => {
        try {
          const response = await put<VerifyPhoneResponse>({
            path: '/verify_phone_number',
            body: { code },
            authState: state,
            pushError: () => null
          });

          if (response?.status === 'success') {
            dispatch({ type: 'VERIFY_PHONE', data: response.data });
          }
        } catch (e) {
          return Alert.alert('Error', JSON.stringify((e as Error).message), [{ text: 'OK' }]);
        }
      },
    }),
    [state]
  );

  const restoreSession = useCallback(async () => {
    console.warn('🚨 🚨 🚨restore Session');
    // grab items from SS
    const userRaw = await SecureStore.getItemAsync(SSKey.UserInfo);
    const tokenRaw = await SecureStore.getItemAsync(SSKey.UserToken);
    const apiRaw = await SecureStore.getItemAsync(SSKey.API);
    const refreshToken = await SecureStore.getItemAsync(SSKey.RefreshToken);

    const sameAPI = apiRaw === Constants?.manifest?.extra?.api;
    // conditional check on parse
    let userToken = null;
    if (tokenRaw) {
      // Sometimes the token has the quotes escaped, sometimes it doesn't.
      // It's like Mounds vs Almond Joy over here man
      try {
        userToken = JSON.parse(tokenRaw);
      } catch (e) {
        userToken = tokenRaw;
      }
    }

    const user = userRaw ? JSON.parse(userRaw) : null;
    // storage corrupt; exit to signin
    if (!user || !userToken || !refreshToken || !sameAPI) {
      authActions.signOut();
    } else {
      // check token exp

      const { exp } = parseJwt(userToken || '');
      const expDate = new Date((exp || 0) * 1000);
      expDate.setHours(expDate.getHours() - 3);

      // not exp; restore session
      if (new Date() > expDate) {
        // grab credentials
        const credentials = await SecureStore.getItemAsync(SSKey.UserCredentials);
        const parsedCredentials = credentials ? JSON.parse(credentials) : null;

        // missing credentials; exit to to splash screen
        if (!parsedCredentials) {
          return;
        }

        // simulate signin with stored credentials
        return authActions.signIn({
          email: parsedCredentials.username,
          password: parsedCredentials.password,
          remember: true,
        });
      }
      // update state
      dispatch({
        type: 'RESTORE_SESSION',
        data: {
          user,
          userToken,
        },
      });

      // Do not navigate Home if user is switching apps
      const currentRoute = navigationRef.isReady() ? navigationRef.getCurrentRoute() : { name: '' };
      const retainCurrentScreen = currentRoute?.name !== 'Home' && currentRoute?.name !== 'SignIn';

      if (retainCurrentScreen) return;

      const isPhoneVerified = user?.['phone-number-verified'];

      // if user's phone number isn't verified, initially navigate to verify phone screen
      if (!isPhoneVerified) return;
    }
  }, [authActions, navigationRef]);

  useEffect(() => {
    console.log('useffect');

    restoreSession();
  }, []);

  // https://reactnative.dev/docs/appstate
  useEffect(() => {
    const onAppStateChange = async (incomingState: string): Promise<void> => {
      if (incomingState !== 'active') return;
      restoreSession();
    };

    const listener = AppState.addEventListener('change', onAppStateChange);

    return () => {
      listener.remove();
    };
  }, [restoreSession]);

  return (
    <AuthContext.Provider
      value={{
        authActions,
        authState: { ...state },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthorization = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuthorization must be used within an Authorization Provider');
  }
  return context;
};
