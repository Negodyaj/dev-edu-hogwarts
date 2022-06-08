import { Reducer } from 'react';
import { LoaderAction, LOADER_DECREMENT, LOADER_INCREMENT } from '../../actions/loader.action';

export interface LoaderState {
  loaderCount: number;
}

const initialState: LoaderState = {
  loaderCount: 0,
};

export const LoaderReducer: Reducer<LoaderState | undefined, LoaderAction> = (
  state: LoaderState = initialState,
  action
) => {
  switch (action.type) {
    case LOADER_INCREMENT: {
      return {
        ...state,
        loaderCount: state.loaderCount + 1,
      };
    }
    case LOADER_DECREMENT: {
      return {
        ...state,
        loaderCount: state.loaderCount - 1,
      };
    }
    default:
      return state;
  }
};
