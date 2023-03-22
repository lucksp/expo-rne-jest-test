import { NavigatorScreenParams } from '@react-navigation/core';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { InspectionStackParams } from './Inspections/types';

// Each screen will be typed & know when using `navigation.navigate('someScreen')
export type HomeStackParams = {
  Account: undefined;
  CreateAccountScreen: { uuid: string };
  InspectionOverviewScreen: { inspectionId: string | number };
  Inspections: undefined;
  VehicleDetail: { vehicleId: string | number };
  InspectionSubStack: NavigatorScreenParams<InspectionStackParams>;
};

export type HomeStackScreenProps<T extends keyof HomeStackParams> = NativeStackScreenProps<
  HomeStackParams,
  T
>;
