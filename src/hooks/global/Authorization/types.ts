export enum SSKey {
  UserInfo = 'userInfo',
  UserCredentials = 'credentials',
  UserToken = 'userToken',
  RefreshToken = 'refreshToken',
  TempPassword = 'tempPass',
  API = 'api',
}

type Actions = {
  createAccount: ({ newUser, uuid }: CreateAccountData) => void;
  setUserLocation: () => void;
  signIn: ({ email, password, remember }: SignInTypes) => void;
  signOut: () => void;
  resendCode: () => void;
  verifyPhoneNumber: (code: string) => void;
};

export type State = {
  isLoading: boolean;
  isSignedOut: boolean;
  error: string | undefined;
  newUser: LoginResponse | null;
  userLocation: UserLocation | null;
  userToken: string | null;
  user: UserShape | null;
  verifyPhone: VerifyPhoneData | null;
};

export type AuthContextType = {
  authState: State;
  authActions?: Actions;
};

export type Action =
  | {
      token: string | null;
      type: 'CREATE_ACCOUNT';
      data: LoginResponse | null;
      error: string | undefined;
    }
  | { type: 'RESTORE_SESSION'; data: RestoreSessionData }
  | { type: 'SIGN_IN'; data: LoginResponse }
  | { type: 'SIGN_OUT' }
  | { type: 'USER_LOCATION'; data: UserLocation }
  | { type: 'RESEND_CODE'; data: ResendCodeResponse }
  | { type: 'VERIFY_PHONE'; data: VerifyPhoneData };

export interface Props {
  children: JSX.Element;
}

export interface SignInTypes {
  email: string;
  password: string;
  remember: boolean;
}

export interface LatLng {
  latitude: number;
  longitude: number;
}

export interface NewUserShape {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  deviceType?: string;
}

export interface UserShape {
  id: number;
  'first-name': string;
  'last-name': string;
  email: string;
  'email-verified': boolean;
  'phone-number': string;
  'phone-number-verified': boolean;
  'avatar-url': string;
  'average-rating': number;
  'identification-status': 'unverified' | 'verified';
  'credit-balance': number;
  'unread-message-count': number;
  'app-login': boolean;
  'driver-cup-opt-in': boolean;
  'suspended-at': string | null;
}

export type LoginResponse = {
  token: string;
  user: UserShape;
  profiles?: {
    'profile-id': number;
    'organization-id': number;
    name: string;
    type: 'business' | 'personal';
    role: 'admin' | 'owner' | 'driver';
    'default-billing-method-id': number;
    default: boolean;
    'ach-enabled': boolean;
    'driver-can-start-pickup': boolean;
    'book-with-purchase-order': boolean;
    'driver-assignment': {
      'organization-id': number;
      'reservation-id': number;
      'fleet-number': string;
    };
  }[];
};

export interface CreateAccountData {
  newUser: NewUserShape;
  uuid: string;
  role?: string;
}

interface RestoreSessionData {
  user: UserShape;
  userToken: string;
}

export type ResendCodeResponse = {
  status: string;
  message: string;
  data: string;
};

export type UserLocation = {
  coords: LatLng;
};

export type VerifyPhoneResponse = {
  status: string;
  data?: {
    isValidCode: boolean;
  };
  messages?: string[];
};

export type VerifyPhoneData = {
  isValidCode?: boolean;
  messages?: string[];
};
