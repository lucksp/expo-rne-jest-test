import { RouteProp } from '@react-navigation/core';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type Section = 'Initialize' | 'Overview' | string;

// Each screen will be typed & know when using
// `navigation.navigate('someScreen', { paramName: someValue })
export type InspectionStackParams = {
  VehicleDetailInspections: {
    vehicleId: string | number;
    name: undefined;
    section: undefined;
    step: undefined;
  };
  VehicleInspectionSection: {
    aggId?: string;
    vehicleId?: string | number;
    name: string;
    section: Section;
  };
  VehicleInspectionStep: {
    aggId?: string;
    vehicleId?: string | number;
    name: string;
    section: Section;
    step: string;
  };
  VehicleInspectionIssue: {
    aggId?: string;
    vehicleId?: string | number;
    name: string;
    section: Section;
    step: string;
    issue: string;
    issueStep: string;
  };
  InspectionSectionOverview: {
    aggId?: string;
    vehicleId?: string | number;
    name: string;
    section: Section;
    step: string;
  };
};

export type InspectionsStackScreenProps<T extends keyof InspectionStackParams> =
  NativeStackScreenProps<InspectionStackParams, T>;

export type InspectionRouteProps<T extends keyof InspectionStackParams> = RouteProp<
  InspectionStackParams,
  T
>;
