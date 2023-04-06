import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { InspectionProgressProvider } from '@/src/hooks/local/Inspections/ActiveInspection/InspectionProgressProvider';
import { InspectionsDataProvider } from '@/src/hooks/local/Inspections/ActiveInspection/InspectionsDataProvider/InspectionsDataProvider';

import { SCREEN_NAME,SCREENS } from '../../screens';
import { InspectionStackParams } from './types';

const InspectionStack = createNativeStackNavigator<InspectionStackParams>();

export function InspectionNavigator(props): JSX.Element {
  // The props show that the nested navigator is accessible from the top level navigator.
  // However, the params are not accessible at the top level `route.params` object. Instead, they
  // are accessible at `route.params.params`.

  return (
    <InspectionsDataProvider>
      <InspectionProgressProvider>
        <InspectionStack.Navigator
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
              
            />
            <InspectionStack.Screen
              name={SCREENS[SCREEN_NAME.VEHICLE_INSPECTIONS_SECTION_OVERVIEW].name}
              component={SCREENS[SCREEN_NAME.VEHICLE_INSPECTIONS_SECTION_OVERVIEW].component}
              options={{
                presentation: 'modal',
              }}
            />
          </InspectionStack.Group>
        </InspectionStack.Navigator>
      </InspectionProgressProvider>
    </InspectionsDataProvider>
  );
}
