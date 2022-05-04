import { Reducer } from 'redux';
import {
  SET_NOTIFICATIONS,
  // CHECK_NOTIFICATIONS,
  NotificationsPageAction,
} from '../../actions/notifications.actions';
import { NotificationResponse } from '../../models/responses/NotificationResponse';

export interface NotificationsPageState {
  notifications: NotificationResponse[]; // check: boolean;
}

const initialState: NotificationsPageState = {
  notifications: [],
  // check: false,
};

export const notificationsPageReducer: Reducer<
  NotificationsPageState,
  NotificationsPageAction
> = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATIONS: {
      return {
        ...state,
        notifications: action.payload,
      };
    }
    // case CHECK_NOTIFICATIONS: {
    //   return {
    //     ...state,

    //   };
    // }
    default:
      return state;
  }
};
