import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { VehicleDataProvider } from '@/src/hooks/local/Vehicle';
import { VehiclesContextProvider } from '@/src/hooks/local/Vehicles';

import { SCREEN_NAME,SCREENS } from '../screens';
import { InspectionNavigator } from './Inspections';
import { HomeStackParams } from './types';

const HomeStack = createNativeStackNavigator<HomeStackParams>();

export function HomeNavigator(): JSX.Element {

  return (
      <VehiclesContextProvider>
        <VehicleDataProvider>
          <HomeStack.Navigator
            screenOptions={{
              headerBackVisible: false,
              headerTitle: '',
            }}
          >
            <HomeStack.Group
              screenOptions={{
                headerShadowVisible: false,
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
            
            {/* This nested navigator has its own stack to keep providers away from the top level
              * navigator. This is to prevent the providers from being re-rendered when the user
              * navigates to a different screen.
              * However, when accessing the nested navigator from the top level navigator, the
              * params are not accessible at the top level `route.params` object. Instead, they
              * are accessible at `route.params.params`.
            */}
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
