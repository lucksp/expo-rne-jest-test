import React, { createContext, ReactNode, useContext, useReducer } from 'react';

import { flatResponseGet } from '@/src/helpers/api';
import { useAPIErrors } from '@/src/hooks/global/APIErrors';
import { useAuthorization } from '@/src/hooks/global/Authorization';

import { useDeltaSwr } from '../../useDeltaSwr';
import { initialState, reducer } from './reducer';
import { ACTIONS, Context, Vehicle } from './types';

const VehiclesContext = createContext<Context | undefined>(undefined);

export const VehiclesContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { pushError } = useAPIErrors();
  const { authState } = useAuthorization();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isManualSearch, searchFleetNumber } = state;

  const query = new URLSearchParams({
    southwestLat: ('latitude' || '').toString(),
    southwestLng: ('longitude' || '').toString(),
    northeastLat: ('latitude' || '').toString(),
    northeastLng: ('longitude' || '').toString(),
    fleetNumber: searchFleetNumber || '',
  });
  const url = `api/v1/operations/vehicles?${query}`;


  const handleManualSearch = async (flag: boolean) => {
    if (flag) {
      // const boundingBox = await mapRefcurrent?.getMapBoundaries();
      // setBoundingBox(boundingBox);
    }
    dispatch({ type: ACTIONS.SET_SEARCH_FLEET_NUMBER, data: '' });
    dispatch({ type: ACTIONS.SET_CURRENT_SEARCH_FLEET_VALUE, data: '' });
    dispatch({ type: ACTIONS.SET_IS_MANUAL_SEARCH, data: flag });
  };

  const { data, mutate, isValidating, error } = useDeltaSwr({
    key:  url,
    fetcher: (key: string) =>
      flatResponseGet<Vehicle[]>({ path: key, authState, pushError }),
    options: {
      onSuccess: resp => {
        if (searchFleetNumber) {
          // handleSetMarkersToFit([resp[0].coordinates]);
        } else if (isManualSearch) {
          handleManualSearch(false);
          dispatch({ type: ACTIONS.SET_IS_USER_GESTURE, data: false });
        } else {
          // handleSetMarkersToFit();
        }
      },
      onError: () => {
        if (isManualSearch) {
          dispatch({ type: ACTIONS.SET_IS_USER_GESTURE, data: false });
          handleManualSearch(false);
        }

        if (searchFleetNumber) {
          //
        }
      },
    },
  });

  return (
    <VehiclesContext.Provider
      value={{
        dispatch,
        error,
        vehicles: data,
        mutate,
        isValidating,
        state,
        handleManualSearch,
      }}
    >
      {children}
    </VehiclesContext.Provider>
  );
};

export const useVehicles = () => {
  const context = useContext(VehiclesContext);

  if (context === undefined) {
    throw new Error('useVehicles must be used within a Vehicles Provider');
  }

  return context;
};
