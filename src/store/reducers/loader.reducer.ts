import { Reducer } from 'react';
import { LoaderAction, DECREMENT_LOADER, INCREMENT_LOADER } from '../../actions/loader.action';

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
    case INCREMENT_LOADER: {
      console.log(state.loaderCount + 1);
      return {
        ...state,
        loaderCount: state.loaderCount + 1,
      };
    }
    case DECREMENT_LOADER: {
      console.log(state.loaderCount - 1);
      return {
        ...state,
        loaderCount: state.loaderCount - 1,
      };
    }
    default:
      return state;
  }
};
