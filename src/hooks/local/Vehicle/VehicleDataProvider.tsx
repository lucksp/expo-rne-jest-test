import React, { createContext, ReactNode, useState } from 'react';
import { Alert } from 'react-native';

import { flatResponseGet } from '@/src/helpers/api';
import { Context, VehicleDetailResponse } from '@/src/hooks/local/Vehicle';

import { useAPIErrors } from '../../global/APIErrors';
import { useAuthorization } from '../../global/Authorization';
import { ApiPath } from '../../routes';
import { useDeltaSwr } from '../../useDeltaSwr';
export const VehicleContext = createContext<Context | undefined>(undefined);

const VehicleDataProvider = ({ children }: {children: ReactNode}) => {
  const [vehicleId, setVehicleId] = useState<string | number>();

  const { pushError } = useAPIErrors();
  const { authState } = useAuthorization();
  console.log('ellllo');

  const {
    data: vehicle,
    error,
    isValidating = true,
  } = useDeltaSwr({
    key: vehicleId ? `${ApiPath.OPERATIONS_VEHICLES}/${vehicleId}` : null,
    fetcher: (url: string) =>
      flatResponseGet<VehicleDetailResponse>({
        path: url,
        authState,
        pushError,
      })
        .then(resp => {
          console.log('hihi');

          const { message, messages, traceID, categories, ...rest } = resp;
          if (resp.message || resp.messages) {
            throw new Error(`Something went wrong: ${message || messages}. traceID: ${traceID}`);
          }

          const vehicleType = (categories?.[1]?.replaceAll('_', '-') ||
            categories?.[0]?.replaceAll('_', '-'));

          return {
            ...rest,
            vehicleType,
          };
        })
        .catch(e => console.error(e)),
  });

  return (
    <VehicleContext.Provider value={{ vehicle, error, isValidating, vehicleId, setVehicleId }}>
      {error &&
        Alert.alert('Uh oh.  No vehicle is available!', `Vehicle ID ${vehicleId} is not found`)}
      {children}
    </VehicleContext.Provider>
  );
};

export { VehicleDataProvider };
