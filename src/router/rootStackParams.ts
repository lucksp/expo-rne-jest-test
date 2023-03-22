import { AuthStackParams } from './Auth/types';
import { InspectionStackParams } from './Home/Inspections/types';
import { HomeStackParams } from './Home/types';

// Specifying undefined means that the route doesn't have params
// https://reactnavigation.org/docs/typescript/#type-checking-the-navigator
// Each screen will be typed & know when using `navigation.navigate('someScreen')
export type RootStackParamList = AuthStackParams & HomeStackParams & InspectionStackParams;
