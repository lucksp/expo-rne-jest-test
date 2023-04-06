import React from 'react'
import { Text } from "react-native";

import { InspectionStackParams } from "./Home/Inspections/types";
import { HomeStackParams } from "./Home/types";


export enum SCREEN_PATH {
  ACCOUNT = '/account',
  CHANGE_PASSWORD = '/changePasswordScreen',
  CONFIRM_CODE = '/confirmCodeScreen',
  CREATE_ACCOUNT = '/createAccountScreen/:uuid',
  INSPECTION_OVERVIEW = '/inspectionOverview/:inspectionId',
  INSPECTIONS = '/inspections',
  SIGNIN = '/signin',
  SPLASH = '/splashScreen',
  VEHICLE_DETAIL = '/vehicle/:vehicleId',
  VEHICLE_DETAIL_INSPECTIONS = '/vehicle/:vehicleId/inspections',
  VEHICLE_INSPECTIONS_SECTION = '/vehicle/:vehicleId/inspections/:name/section/:sectionType',
  VEHICLE_INSPECTIONS_SECTION_OVERVIEW = '/vehicle/:vehicleId/inspections/:name/section/:sectionType/step/:stepID/overview',
  VEHICLE_INSPECTIONS_STEP = '/vehicle/:vehicleId/inspections/:name/section/:sectionType/step/:stepID',
  VEHICLE_INSPECTIONS_ISSUE = '/vehicle/:vehicleId/inspections/:name/section/:sectionType/step/:stepID/issue/:issueStep',
}

export enum SCREEN_NAME {
  ACCOUNT = 'Account',
  CHANGE_PASSWORD = 'ChangePasswordScreen',
  CONFIRM_CODE = 'ConfirmCodeScreen',
  CREATE_ACCOUNT = 'CreateAccountScreen',
  INSPECTION_OVERVIEW = 'InspectionOverviewScreen',
  INSPECTIONS = 'Inspections',
  SIGNIN = 'SignIn',
  SPLASH = 'SplashScreen',
  VEHICLE_DETAIL = 'VehicleDetail',
  VEHICLE_DETAIL_INSPECTIONS = 'VehicleDetailInspections',
  VEHICLE_INSPECTIONS_SECTION = 'VehicleInspectionSection',
  VEHICLE_INSPECTIONS_SECTION_OVERVIEW = 'InspectionSectionOverview',
  VEHICLE_INSPECTIONS_STEP = 'VehicleInspectionStep',
  VEHICLE_INSPECTIONS_ISSUE = 'VehicleInspectionIssue',
}

const HOME_SCREENS = {
  [SCREEN_NAME.ACCOUNT]: {
    name: SCREEN_NAME.ACCOUNT as keyof HomeStackParams,
    path: SCREEN_PATH.ACCOUNT,
    component: () => <Text>Account</Text>,
  },
  [SCREEN_NAME.INSPECTIONS]: {
    name: SCREEN_NAME.INSPECTIONS as keyof HomeStackParams,
    path: SCREEN_PATH.INSPECTIONS,
    component: () => <Text>Home</Text>,
  },
  [SCREEN_NAME.VEHICLE_DETAIL]: {
    name: SCREEN_NAME.VEHICLE_DETAIL as keyof HomeStackParams,
    path: SCREEN_PATH.VEHICLE_DETAIL,
    component: () => <Text>Detail</Text>,
  },
};


const INSPECTIONS_SCREENS = {
  [SCREEN_NAME.VEHICLE_DETAIL_INSPECTIONS]: {
    name: SCREEN_NAME.VEHICLE_DETAIL_INSPECTIONS as keyof InspectionStackParams,
    path: SCREEN_PATH.VEHICLE_DETAIL_INSPECTIONS,
    component: () => <Text>Vehcle Detail Inspections</Text>,
  },
  [SCREEN_NAME.VEHICLE_INSPECTIONS_SECTION]: {
    name: SCREEN_NAME.VEHICLE_INSPECTIONS_SECTION as keyof InspectionStackParams,
    path: SCREEN_PATH.VEHICLE_INSPECTIONS_SECTION,
    component: () => <Text>Inspection Section</Text>,
  },
  [SCREEN_NAME.VEHICLE_INSPECTIONS_SECTION_OVERVIEW]: {
    name: SCREEN_NAME.VEHICLE_INSPECTIONS_SECTION_OVERVIEW as keyof InspectionStackParams,
    path: SCREEN_PATH.VEHICLE_INSPECTIONS_SECTION_OVERVIEW,
    component: () => <Text>Overview</Text>,
  },
  [SCREEN_NAME.VEHICLE_INSPECTIONS_STEP]: {
    name: SCREEN_NAME.VEHICLE_INSPECTIONS_STEP as keyof InspectionStackParams,
    path: SCREEN_PATH.VEHICLE_INSPECTIONS_STEP,
    component: () => <Text>Inspection Step</Text>,
  },
};

export const SCREENS = {
  ...HOME_SCREENS,
  ...INSPECTIONS_SCREENS,
};
