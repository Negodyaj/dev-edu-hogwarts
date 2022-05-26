import { Reducer } from 'react';
import { 
  ADD_NOTIFICATION, 
  NotificationsContainerActions 
} from '../../actions/notificationsContainer.actions';
import { Notifs, notifs } from '../../models/NotificationsData';


export interface NotificationsContainerState{
  container: Notifs[];
}

export const initialState: NotificationsContainerState = {
  container: [],
}

export const notificationsContainerReducer: Reducer<
  NotificationsContainerState | undefined,
  NotificationsContainerActions> = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      const updContainer = state.container.concat(notifs[action.payload])
      return {
        ...state, container: updContainer
      };
    default:
      return state;
  }
};