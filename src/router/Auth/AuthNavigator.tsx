import { FluidTruckTextIcon } from '@fluidtruck/mobile-icons';
import { useNavigation } from '@react-navigation/core';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { GoBack } from '@/src/components/Header/GoBack';
import { useAuthorization } from '@/src/hooks/global/Authorization';

import { SCREEN_NAME, SCREENS } from '../screens';
import { useAuthStyles } from './styles';
import { AuthStackParams } from './types';

const AuthStack = createNativeStackNavigator<AuthStackParams>();

export const AuthNavigator = (): JSX.Element => {
  const { authState } = useAuthorization();
  const navigation = useNavigation();

  const authStyles = useAuthStyles();

  return (
    <AuthStack.Navigator
      initialRouteName={SCREENS[SCREEN_NAME.SIGNIN].name}
      screenOptions={{ headerBackVisible: false, headerTitle: '' }}
    >
      <AuthStack.Screen
        name={SCREENS[SCREEN_NAME.SPLASH].name}
        options={{
          headerShadowVisible: false,
          animationTypeForReplace: authState.isSignedOut ? 'pop' : 'push',
          headerStyle: {
            ...authStyles.headerStyles,
          },
          headerBackVisible: false,
        }}
        component={SCREENS[SCREEN_NAME.SPLASH].component}
      />
      <AuthStack.Screen
        name={SCREENS[SCREEN_NAME.SIGNIN].name}
        options={{
          headerShadowVisible: false,
          animationTypeForReplace: authState.isSignedOut ? 'pop' : 'push',
          headerStyle: {
            ...authStyles.headerStyles,
          },
          headerLeft: () => {
            const { history } = navigation?.getState() || {};
            return history ? <GoBack /> : <></>;
          },
        }}
        component={SCREENS[SCREEN_NAME.SIGNIN].component}
      />
      <AuthStack.Screen
        name={SCREENS[SCREEN_NAME.CHANGE_PASSWORD].name}
        options={{
          title: 'Change Password',
          headerTitleStyle: { ...authStyles.headerTitle },
          headerShadowVisible: false,
          animationTypeForReplace: authState.isSignedOut ? 'pop' : 'push',
          headerStyle: {
            ...authStyles.headerStyles,
          },
          headerBackVisible: false,
        }}
        component={SCREENS[SCREEN_NAME.CHANGE_PASSWORD].component}
      />
      <AuthStack.Screen
        name={SCREENS[SCREEN_NAME.CONFIRM_CODE].name}
        options={{
          title: 'Confirm Code',
          headerTitleStyle: { ...authStyles.headerTitle },
          headerShadowVisible: false,
          animationTypeForReplace: authState.isSignedOut ? 'pop' : 'push',
          headerStyle: {
            ...authStyles.headerStyles,
          },
          headerLeft: () => <GoBack />,
        }}
        component={SCREENS[SCREEN_NAME.CONFIRM_CODE].component}
      />
      <AuthStack.Screen
        name={SCREENS[SCREEN_NAME.CREATE_ACCOUNT].name}
        options={{
          headerTitle: () => <FluidTruckTextIcon />,
          headerShadowVisible: false,
          animationTypeForReplace: authState.isSignedOut ? 'pop' : 'push',
          headerStyle: {
            ...authStyles.headerStyles,
          },
          headerBackVisible: false,
        }}
        component={SCREENS[SCREEN_NAME.CREATE_ACCOUNT].component}
      />
    </AuthStack.Navigator>
  );
};
