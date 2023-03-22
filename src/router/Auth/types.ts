import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Each screen will be typed & know when using `navigation.navigate('someScreen')
export type AuthStackParams = {
  ChangePasswordScreen: undefined;
  ConfirmCodeScreen: undefined;
  CreateAccountScreen: { uuid: string };
  SignIn: undefined;
  SplashScreen: undefined;
};

export type AuthStackScreenProps<T extends keyof AuthStackParams> = NativeStackScreenProps<
  AuthStackParams,
  T
>;
