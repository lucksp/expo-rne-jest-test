import { Action, State } from './types';

export const reducer = (prevState: State, action: Action): State => {
  switch (action.type) {
    case 'CREATE_ACCOUNT':
      return {
        ...prevState,
        newUser: action.data || null,
        userToken: action.token,
        error: action.error,
      };
    case 'RESTORE_SESSION':
      return {
        ...prevState,
        userToken: action.data.userToken,
        user: action.data.user,
        isSignedOut: action.data.userToken !== null ? false : true,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        isSignedOut: false,
        userToken: action.data.token,
        user: action.data.user,
        isLoading: false,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        isSignedOut: true,
        userToken: null,
        user: null,
        isLoading: false,
      };
    case 'USER_LOCATION':
      return {
        ...prevState,
        userLocation: action.data,
      };
    case 'VERIFY_PHONE':
      return {
        ...prevState,
        verifyPhone: action.data,
      };
    default:
      return {
        ...prevState,
      };
  }
};
