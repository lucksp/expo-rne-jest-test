export enum ApiPath {
  GET_ISSUE = 'api/operations/issues',
  LOGIN = 'api/login',
  OPERATIONS_INSPECTIONS_SIGNEDURLS = 'api/v1/operations/inspections/upload',
  OPERATIONS_INSPECTIONS_TEMPLATE = 'api/v2/operations/inspections/template',
  OPERATIONS_VEHICLES = 'api/v1/operations/vehicles',
  SAVE_INSPECTION = 'api/v1/operations/inspection',
  SAVE_ISSUE = 'api/v1/operations/issue',
  USERS = 'api/users',
  USERS_FORGOTPASSWORD = 'api/users/forgot_password',
  USERS_SENDPHONEVERIFICATION = 'api/v1/users/send_phone_verification',
  USERS_VERIFYPASSWORD = 'api/users/verify_password',
}

export enum ApiMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}
