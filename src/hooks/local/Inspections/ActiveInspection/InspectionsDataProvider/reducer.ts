import { ActionGeneric, ACTIONS } from './actions';
import { ReducerState } from './types';

export const initialState: ReducerState = {
  [ACTIONS.SET_INSPECTION_NAME]: null,
};

export const reducer = (baseState: ReducerState, action: ActionGeneric<ACTIONS>) => {
  switch (action.type) {
    case ACTIONS.SET_INSPECTION_NAME: {
      baseState[ACTIONS.SET_INSPECTION_NAME] = action.data;
      break;
    }

    default:
      throw new Error(`Unknown Action in the reducer: ${JSON.stringify(action)}`);
  }
};
