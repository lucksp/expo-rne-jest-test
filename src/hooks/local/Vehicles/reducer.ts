import { Action, ACTIONS, State } from './types';

export const initialState: State = {
  vehicleId: '',
  isUserGesture: false,
  isManualSearch: false,
  searchFleetNumber: '',
  currentSearchFleetValue: '',
};

export const reducer = (prev: State, action: Action): State => {
  switch (action.type) {
    case ACTIONS.SET_VEHICLE_ID:
      return {
        ...prev,
        vehicleId: action.data,
      };
    case ACTIONS.SET_IS_USER_GESTURE:
      return {
        ...prev,
        isUserGesture: action.data,
      };
    case ACTIONS.SET_IS_MANUAL_SEARCH:
      return {
        ...prev,
        isManualSearch: action.data,
      };
    case ACTIONS.SET_SEARCH_FLEET_NUMBER:
      return {
        ...prev,
        searchFleetNumber: action.data,
      };
    case ACTIONS.SET_CURRENT_SEARCH_FLEET_VALUE:
      return {
        ...prev,
        currentSearchFleetValue: action.data,
      };
    default:
      throw new Error(`Inavalid ACTION: ${action}`);
  }
};
