import React, { createContext, useContext, useState } from 'react';
import { useImmerReducer } from 'use-immer';

export interface ErrorType {
  path: string;
  message?: string;
  traceId?: string;
  body?: string; // Note: expects JSON.stringify
  method: 'PUT' | 'POST' | 'PATCH' | 'DELETE' | 'GET';
  token: string;
}

interface ErrorState {
  [traceId: string]: ErrorType;
}

interface ContextType {
  errors: ErrorState;
  pushError: (e: ErrorType) => void;
  removeError: (traceId: string) => void;
}

const APIErrorContext = createContext<ContextType>({
  errors: {} as ErrorState,
  pushError: () => console.warn('APIError context not mounted'),
  removeError: () => console.warn('APIError context not mounted'),
});

interface Props {
  children: JSX.Element;
}

type Actions =
  | { type: 'PUSH'; traceId?: string; e: ErrorType }
  | { type: 'REMOVE'; traceId: string };

const reducer = (draft: ErrorState, action: Actions) => {
  switch (action.type) {
    case 'PUSH': {
      if (action.traceId) {
        draft[action.traceId] = action.e;
        break;
      }
      break;
    }
    case 'REMOVE':
      delete draft[action.traceId];
      break;

    default:
      throw new Error('Invalid event dispatched.');
  }
};

export const APIErrorProvider = (props: Props): JSX.Element => {
  const [state, dispatch] = useImmerReducer(reducer, {} as ErrorState);

  const pushError = (e: ErrorType) => {
    dispatch({
      type: 'PUSH',
      traceId: e.traceId,
      ...(e.traceId ? { traceId: e.traceId } : {}),
      e,
    });
  };
  const removeError = (traceId: string) => {
    dispatch({ type: 'REMOVE', traceId });
  };
  return (
    <APIErrorContext.Provider value={{ errors: state, pushError, removeError }}>
        {props.children}
    </APIErrorContext.Provider>
  );
};

export const useAPIErrors = (): ContextType =>
  useContext<ContextType>(APIErrorContext);
