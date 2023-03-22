import './translations';
import 'expo-dev-client';

import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import ErrorBoundary from './src/components/ErrorBoundary/ErrorBoundary';
import { SWRConfigWrapper } from './src/components/SWRConfigWrapper';
import { GlobalContextProvider } from './src/hooks/global';
import { NavigationContainer } from './src/router';
import { RootStack } from './src/router/RootStack';
import { AppTheme } from './src/theme/AppTheme';

export default function App(): JSX.Element {
  return (
    <ErrorBoundary>
      <SWRConfigWrapper>
        <SafeAreaProvider>
          <NavigationContainer>
            <AppTheme>
              <GlobalContextProvider>
                <RootStack />
              </GlobalContextProvider>
            </AppTheme>
          </NavigationContainer>
        </SafeAreaProvider>
      </SWRConfigWrapper>
    </ErrorBoundary>
  );
}
