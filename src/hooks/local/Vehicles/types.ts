import type { VEHICLE_TYPES } from '@fluidtruck/mobile';
import { SWRResponse } from 'swr';

import { FlatApiResponse } from '@/src/helpers/api';

export enum ACTIONS {
  SET_VEHICLE_ID = 'SET_VEHICLE_ID',
  SET_IS_USER_GESTURE = 'SET_IS_USER_GESTURE',
  SET_IS_MANUAL_SEARCH = 'SET_IS_MANUAL_SEARCH',
  SET_SEARCH_FLEET_NUMBER = 'SET_SEARCH_FLEET_NUMBER',
  SET_CURRENT_SEARCH_FLEET_VALUE = 'SET_CURRENT_SEARCH_FLEET_VALUE',
}

export type Action =
  | {
      type: ACTIONS.SET_VEHICLE_ID;
      data: State['vehicleId'];
    }
  | {
      type: ACTIONS.SET_IS_USER_GESTURE;
      data: State['isUserGesture'];
    }
  | {
      type: ACTIONS.SET_IS_MANUAL_SEARCH;
      data: State['isManualSearch'];
    }
  | {
      type: ACTIONS.SET_SEARCH_FLEET_NUMBER;
      data: State['searchFleetNumber'];
    }
  | {
      type: ACTIONS.SET_CURRENT_SEARCH_FLEET_VALUE;
      data: State['currentSearchFleetValue'];
    };

export interface State {
  isUserGesture: boolean;
  vehicleId: string | number;
  isManualSearch: boolean;
  searchFleetNumber?: string;
  currentSearchFleetValue: string;
}

export interface Context extends SWRResponse<FlatApiResponse<Vehicle[]>> {
  vehicles?: FlatApiResponse<Vehicle[]>;
  state?: State;
  dispatch: React.Dispatch<Action>;
  handleManualSearch: (flag: boolean) => void;
}

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type Vehicle = {
  id: number;
  fleetNumber: string;
  make?: string;
  model?: string;
  coordinates: Coordinates;
  isElectric?: boolean;
  vehicleType?: VEHICLE_TYPES;
};
