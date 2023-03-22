import { useTheme } from '@rneui/themed';
import React, { ReactElement } from 'react';
import { useColorScheme, View } from 'react-native';

import { DeltaStatusBar } from '../components/StatusBar/StatusBar';
import { useAuthorization } from '../hooks/global/Authorization';
import { useStatusBarContext } from '../hooks/global/StatusBarColor';
import { SplashScreen } from '../screens/Auth/SplashScreen';
import { AuthNavigator } from './Auth';
import { HomeNavigator } from './Home';

export const RootStack = (): ReactElement => {
  const { color } = useStatusBarContext();
  const colorScheme = useColorScheme();
  const {
    authState: { isSignedOut, isLoading },
  } = useAuthorization();
  const {
    theme: { colors },
  } = useTheme();
  let Stack = SplashScreen;

  if (isSignedOut && !isLoading) {
    Stack = AuthNavigator;
  } else if (!isSignedOut && !isLoading) {
    Stack = HomeNavigator;
  }

  return (
    // to help with signing out flashing between nav stacks
    <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
      <DeltaStatusBar
        backgroundColor={color}
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <Stack />
    </View>
  );
};
