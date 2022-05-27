import { Reducer } from 'react';
import {
  ADD_NOTIFICATION,
  NotificationsContainerActions,
} from '../../actions/notificationsContainer.actions';
import { NotificationData } from '../../components/NotificationsContainer/NotificationItem/NotificationItem';

export interface NotificationsContainerState {
  notifications: NotificationData[];
}

export const initialState: NotificationsContainerState = {
  notifications: [],
};

export const notificationsContainerReducer: Reducer<
  NotificationsContainerState | undefined,
  NotificationsContainerActions
> = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    default:
      return state;
  }
};
