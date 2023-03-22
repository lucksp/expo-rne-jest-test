import { ReducerState } from './types';

export enum ACTIONS {
  SET_INSPECTION_NAME = 'SET_INSPECTION_NAME',
}

export type ActionGeneric<T extends ACTIONS> = {
  type: T;
  data: ReducerState[T];
};

export type Action = ActionGeneric<ACTIONS.SET_INSPECTION_NAME>;
