import React, {
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react';

import { reducer } from '../../reducer';
import { AuthContextType, Props, State } from '../../types';


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

type PropsWithState = Props & { userToken?: State['userToken']; user?: State['user'] };

export function MockAuthContextProvider({ children, ...rest }: PropsWithState): JSX.Element {
  const [state] = useReducer(reducer, { ...initialState, ...rest });
  console.warn('MOCKED AuthContextProvider');

  const authActions = useMemo(
    () => ({
      createAccount: jest.fn(),
      setUserLocation: jest.fn(),
      signIn: jest.fn(),
      signOut: jest.fn(),
      resendCode: jest.fn(),
      verifyPhoneNumber: jest.fn(),
    }),
    []
  );

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
}

export const useAuthorization = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuthorization must be used within an Authorization Provider');
  }
  return context;
};
