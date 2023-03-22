import React, { createContext, ReactNode } from 'react';
import { useImmerReducer } from 'use-immer';

import { flatResponseGet } from '@/src/helpers/api';
import { ApiPath } from '@/src/hooks/routes';
import { useDeltaSwr } from '@/src/hooks/useDeltaSwr';

import { useAPIErrors } from '../../../global/APIErrors';
import { useAuthorization } from '../../../global/Authorization';
import { ACTIONS } from './actions';
import { initialState, reducer } from './reducer';
import { Context, Inspection } from './types';

export const InspectionsDataContext = createContext<Context | undefined>(undefined);

export const InspectionsDataProvider = ({ children }: { children: ReactNode }) => {
  const { authState } = useAuthorization();
  const { pushError } = useAPIErrors();
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const useUrl = authState.userToken && state[ACTIONS.SET_INSPECTION_NAME];

  const { data, mutate, error, isValidating } = useDeltaSwr({
    key: useUrl
      ? `${ApiPath.OPERATIONS_INSPECTIONS_TEMPLATE}?name=${state[ACTIONS.SET_INSPECTION_NAME]}`
      : null,
    fetcher: (url: string) => flatResponseGet<Inspection>({ path: url, authState, pushError }),
    options: {
      onSuccess: resp => {
        if (resp.message || resp.messages) {
          throw new Error(
            `Unable to get Inspection Data: ${resp.message || resp.messages?.join()}, TraceID: ${
              resp.traceID
            }`
          );
        }
      },
      onError: err => {
        throw new Error(
          `Something went wrong fetching inspection ${state[ACTIONS.SET_INSPECTION_NAME]}: ${
            (err as Error).message
          }`
        );
      },
    },
  });
  console.log({ data });

  return (
    <InspectionsDataContext.Provider
      value={{
        mutate,
        error,
        isValidating,
        inspectionData: data,
        state,
        dispatch,
      }}
    >
      {children}
    </InspectionsDataContext.Provider>
  );
};
