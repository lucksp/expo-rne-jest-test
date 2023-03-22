import { ChangePasswordScreen } from '@/src/screens/Auth/ChangePasswordScreen';
import { ConfirmCodeScreen } from '@/src/screens/Auth/ConfirmCodeScreen';
import { CreateAccountScreen } from '@/src/screens/Auth/CreateAccount';
import { SignInScreen } from '@/src/screens/Auth/SignInScreen';
import { SplashScreen } from '@/src/screens/Auth/SplashScreen';

import { SectionOverview } from '../features/Inspections/InspectionFactory/InspectionViews/Section/Overview';
import { Account } from '../screens/Home/Account/Account';
import { HomeInspection } from '../screens/Home/HomeMapView';
import {
  InspectionViewMapper,
  VehicleDetail,
  VehicleDetailInspectionList,
} from '../screens/Home/Vehicle';
import { InspectionIssueViewWrapper } from '../screens/Home/Vehicle/Inspection/InspectionIssueMapper';
import { InspectionStepViewWrapper } from '../screens/Home/Vehicle/Inspection/InspectionStepMapper';
import { AuthStackParams } from './Auth/types';
import { InspectionStackParams } from './Home/Inspections/types';
import { HomeStackParams } from './Home/types';

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
    component: Account,
  },
  [SCREEN_NAME.INSPECTIONS]: {
    name: SCREEN_NAME.INSPECTIONS as keyof HomeStackParams,
    path: SCREEN_PATH.INSPECTIONS,
    component: HomeInspection,
  },
  [SCREEN_NAME.VEHICLE_DETAIL]: {
    name: SCREEN_NAME.VEHICLE_DETAIL as keyof HomeStackParams,
    path: SCREEN_PATH.VEHICLE_DETAIL,
    component: VehicleDetail,
  },
};

const AUTH_SCREENS = {
  [SCREEN_NAME.CHANGE_PASSWORD]: {
    name: SCREEN_NAME.CHANGE_PASSWORD as keyof AuthStackParams,
    path: SCREEN_PATH.CHANGE_PASSWORD,
    component: ChangePasswordScreen,
  },
  [SCREEN_NAME.CONFIRM_CODE]: {
    name: SCREEN_NAME.CONFIRM_CODE as keyof AuthStackParams,
    path: SCREEN_PATH.CONFIRM_CODE,
    component: ConfirmCodeScreen,
  },
  [SCREEN_NAME.CREATE_ACCOUNT]: {
    name: SCREEN_NAME.CREATE_ACCOUNT as keyof AuthStackParams,
    path: SCREEN_PATH.CREATE_ACCOUNT,
    component: CreateAccountScreen,
  },
  [SCREEN_NAME.SIGNIN]: {
    name: SCREEN_NAME.SIGNIN as keyof AuthStackParams,
    path: SCREEN_PATH.SIGNIN,
    component: SignInScreen,
  },
  [SCREEN_NAME.SPLASH]: {
    name: SCREEN_NAME.SPLASH as keyof AuthStackParams,
    path: SCREEN_PATH.SPLASH,
    component: SplashScreen,
  },
};

const INSPECTIONS_SCREENS = {
  [SCREEN_NAME.VEHICLE_DETAIL_INSPECTIONS]: {
    name: SCREEN_NAME.VEHICLE_DETAIL_INSPECTIONS as keyof InspectionStackParams,
    path: SCREEN_PATH.VEHICLE_DETAIL_INSPECTIONS,
    component: VehicleDetailInspectionList,
  },
  [SCREEN_NAME.VEHICLE_INSPECTIONS_SECTION]: {
    name: SCREEN_NAME.VEHICLE_INSPECTIONS_SECTION as keyof InspectionStackParams,
    path: SCREEN_PATH.VEHICLE_INSPECTIONS_SECTION,
    component: InspectionViewMapper,
  },
  [SCREEN_NAME.VEHICLE_INSPECTIONS_SECTION_OVERVIEW]: {
    name: SCREEN_NAME.VEHICLE_INSPECTIONS_SECTION_OVERVIEW as keyof InspectionStackParams,
    path: SCREEN_PATH.VEHICLE_INSPECTIONS_SECTION_OVERVIEW,
    component: SectionOverview,
  },
  [SCREEN_NAME.VEHICLE_INSPECTIONS_STEP]: {
    name: SCREEN_NAME.VEHICLE_INSPECTIONS_STEP as keyof InspectionStackParams,
    path: SCREEN_PATH.VEHICLE_INSPECTIONS_STEP,
    component: InspectionStepViewWrapper,
  },
  [SCREEN_NAME.VEHICLE_INSPECTIONS_ISSUE]: {
    name: SCREEN_NAME.VEHICLE_INSPECTIONS_ISSUE as keyof InspectionStackParams,
    path: SCREEN_PATH.VEHICLE_INSPECTIONS_ISSUE,
    component: InspectionIssueViewWrapper,
  },
};

export const SCREENS = {
  ...HOME_SCREENS,
  ...AUTH_SCREENS,
  ...INSPECTIONS_SCREENS,
};
