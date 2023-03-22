
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
  // [SCREEN_NAME.INSPECTIONS]: {
  //   name: SCREEN_NAME.INSPECTIONS as keyof HomeStackParams,
  //   path: SCREEN_PATH.INSPECTIONS,
  //   component: HomeInspection,
  // },
  // [SCREEN_NAME.VEHICLE_DETAIL]: {
  //   name: SCREEN_NAME.VEHICLE_DETAIL as keyof HomeStackParams,
  //   path: SCREEN_PATH.VEHICLE_DETAIL,
  //   component: VehicleDetail,
  // },
};


export const SCREENS = {
  ...HOME_SCREENS,
};
