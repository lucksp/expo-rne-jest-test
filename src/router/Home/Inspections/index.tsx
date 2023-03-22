import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { GoBack } from '@/src/components/Header/GoBack';
import { InspectionHeader } from '@/src/features/Inspections/InspectionHeader';
import { InspectionProgressProvider } from '@/src/hooks/local/Inspections/InspectionProgressProvider';
import { InspectionsDataProvider } from '@/src/hooks/local/Inspections/InspectionsDataProvider/InspectionsDataProvider';
import { SCREEN_NAME, SCREENS } from '@/src/router/screens';

import { useInspectionStyles } from './styles';
import { InspectionStackParams } from './types';

const InspectionStack = createNativeStackNavigator<InspectionStackParams>();

export function InspectionNavigator(): JSX.Element {
  const styles = useInspectionStyles();

  return (
    <InspectionsDataProvider>
      <InspectionProgressProvider>
        <InspectionStack.Navigator
          screenOptions={{
            headerStyle: styles.headerStyles,
            headerBackVisible: false,
            headerShadowVisible: false,
            headerTitle: '',
            headerLeft: () => <GoBack />,
          }}
        >
          <InspectionStack.Screen
            name={SCREENS[SCREEN_NAME.VEHICLE_DETAIL_INSPECTIONS].name}
            component={SCREENS[SCREEN_NAME.VEHICLE_DETAIL_INSPECTIONS].component}
          />
          <InspectionStack.Group>
            <InspectionStack.Screen
              name={SCREENS[SCREEN_NAME.VEHICLE_INSPECTIONS_SECTION].name}
              component={SCREENS[SCREEN_NAME.VEHICLE_INSPECTIONS_SECTION].component}
            />
            <InspectionStack.Screen
              name={SCREENS[SCREEN_NAME.VEHICLE_INSPECTIONS_STEP].name}
              component={SCREENS[SCREEN_NAME.VEHICLE_INSPECTIONS_STEP].component}
              options={{
                headerRight: () => <InspectionHeader />,
              }}
            />
            <InspectionStack.Screen
              name={SCREENS[SCREEN_NAME.VEHICLE_INSPECTIONS_ISSUE].name}
              component={SCREENS[SCREEN_NAME.VEHICLE_INSPECTIONS_ISSUE].component}
              options={{
                presentation: 'fullScreenModal',
              }}
            />
            <InspectionStack.Screen
              name={SCREENS[SCREEN_NAME.VEHICLE_INSPECTIONS_SECTION_OVERVIEW].name}
              component={SCREENS[SCREEN_NAME.VEHICLE_INSPECTIONS_SECTION_OVERVIEW].component}
              options={{
                headerLeft: () => <GoBack iconDirection="down" />,
                presentation: 'modal',
              }}
            />
          </InspectionStack.Group>
        </InspectionStack.Navigator>
      </InspectionProgressProvider>
    </InspectionsDataProvider>
  );
}
