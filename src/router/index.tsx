import { NavigationContainer as NavContainer } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import React, { ReactNode } from 'react';

import { config as authConfig } from './Auth/stackConfig';

const linking = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      ...authConfig,
    },
  },
};

export const NavigationContainer = ({ children }: { children: ReactNode }): JSX.Element => {
  return <NavContainer linking={linking}>{children}</NavContainer>;
};
