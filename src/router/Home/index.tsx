import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { VehicleDataProvider } from '@/src/hooks/local/Vehicle';
import { VehiclesContextProvider } from '@/src/hooks/local/Vehicles';

import { SCREEN_NAME, SCREENS } from '../screens';
import { InspectionNavigator } from './Inspections';
import { useInspectionStyles } from './styles';
import { HomeStackParams } from './types';

const HomeStack = createNativeStackNavigator<HomeStackParams>();

export function HomeNavigator(): JSX.Element {
  const styles = useInspectionStyles();

  return (
      <VehiclesContextProvider>
        <VehicleDataProvider>
          <HomeStack.Navigator
            screenOptions={{
              headerStyle: styles.headerStyles,
              headerBackVisible: false,
              headerTitle: '',
            }}
          >
            <HomeStack.Group
              screenOptions={{
                headerShadowVisible: false,
                headerStyle: styles.headerStyles,
              }}
            >
              <HomeStack.Screen
                name={SCREENS[SCREEN_NAME.INSPECTIONS].name}
                component={SCREENS[SCREEN_NAME.INSPECTIONS].component}
              />
              <HomeStack.Screen
                name={SCREENS[SCREEN_NAME.ACCOUNT].name}
                component={SCREENS[SCREEN_NAME.ACCOUNT].component}
              />

              <HomeStack.Screen
                name={SCREENS[SCREEN_NAME.VEHICLE_DETAIL].name}
                component={SCREENS[SCREEN_NAME.VEHICLE_DETAIL].component}
              />
            </HomeStack.Group>
            <HomeStack.Screen
              options={{ headerShown: false }}
              name={'InspectionSubStack'}
              component={InspectionNavigator}
            />
          </HomeStack.Navigator>
        </VehicleDataProvider>
      </VehiclesContextProvider>
  );
}
