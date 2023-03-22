import { useClusterMapContext } from '@fluidtruck/mobile';
import React, { createContext, ReactNode, useContext, useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { LatLng } from 'react-native-maps';

import { flatResponseGet } from '@/src/helpers/api';
import { useAPIErrors } from '@/src/hooks/global/APIErrors';
import { useAuthorization } from '@/src/hooks/global/Authorization';

import { usePrevious } from '../../global/usePrevious';
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
  const { boundingBox, handleSetMarkersToFit, setBoundingBox, mapRef } =
    useClusterMapContext();

  const { southWest, northEast } = boundingBox || {};
  const prevSouthWest = usePrevious<LatLng | undefined>(southWest);
  const prevNorthEast = usePrevious<LatLng | undefined>(northEast);

  const { t } = useTranslation(['common']);

  const query = new URLSearchParams({
    southwestLat: (southWest?.latitude || '').toString(),
    southwestLng: (southWest?.longitude || '').toString(),
    northeastLat: (northEast?.latitude || '').toString(),
    northeastLng: (northEast?.longitude || '').toString(),
    fleetNumber: searchFleetNumber || '',
  });
  const url = `api/v1/operations/vehicles?${query}`;

  const hasSouthWestKeys = !!Object.keys(southWest || {}).length;
  const hasNorthEastKeys = !!Object.keys(northEast || {}).length;

  const sameSouthWest =
    prevSouthWest?.latitude === southWest?.latitude &&
    prevSouthWest?.longitude === southWest?.longitude;
  const sameNorthEast =
    prevNorthEast?.latitude === northEast?.latitude &&
    prevNorthEast?.longitude === northEast?.longitude;

  const sameBoundingBox = sameSouthWest && sameNorthEast;
  const manualIsReady =
    (isManualSearch && !sameBoundingBox) || !!searchFleetNumber;
  const hasBoundingBox = hasSouthWestKeys && hasNorthEastKeys;

  const isReadyToFetch = hasBoundingBox || manualIsReady;

  const handleManualSearch = async (flag: boolean) => {
    if (flag) {
      const boundingBox = await mapRef?.current?.getMapBoundaries();
      setBoundingBox(boundingBox);
    }
    dispatch({ type: ACTIONS.SET_SEARCH_FLEET_NUMBER, data: '' });
    dispatch({ type: ACTIONS.SET_CURRENT_SEARCH_FLEET_VALUE, data: '' });
    dispatch({ type: ACTIONS.SET_IS_MANUAL_SEARCH, data: flag });
  };

  const { data, mutate, isValidating, error } = useDeltaSwr({
    key: isReadyToFetch ? url : null,
    fetcher: (key: string) =>
      flatResponseGet<Vehicle[]>({ path: key, authState, pushError }),
    options: {
      onSuccess: resp => {
        if (searchFleetNumber) {
          handleSetMarkersToFit([resp[0].coordinates]);
        } else if (isManualSearch) {
          handleManualSearch(false);
          dispatch({ type: ACTIONS.SET_IS_USER_GESTURE, data: false });
        } else {
          handleSetMarkersToFit();
        }
      },
      onError: () => {
        if (isManualSearch) {
          dispatch({ type: ACTIONS.SET_IS_USER_GESTURE, data: false });
          handleManualSearch(false);
        }

        if (searchFleetNumber) {
          Alert.alert(
            t('common:error.error'),
            `No vehicle matches ID ${searchFleetNumber}`,
            [
              {
                text: t('common:button.ok'),
                onPress: () => {
                  dispatch({
                    type: ACTIONS.SET_CURRENT_SEARCH_FLEET_VALUE,
                    data: '',
                  });
                  dispatch({ type: ACTIONS.SET_SEARCH_FLEET_NUMBER, data: '' });
                },
              },
            ],
          );
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
