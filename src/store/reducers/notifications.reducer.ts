import { Reducer } from 'redux';
import {
  SET_NOTIFICATIONS,
  FILTER_NOTIFICATIONS,
  NotificationsPageAction,
  SET_NOTIFICATIONS,
  // CHECK_NOTIFICATIONS,
} from '../../actions/notifications.actions';
import { NotificationData } from '../../pages/NotificationsPage/components/NotificationsCard';
import { NotificationResponse } from '../../models/responses/NotificationResponse';

export interface NotificationsPageState {
  notifications: NotificationData[];
  filteredNotifications: NotificationData[];
  notifications: NotificationResponse[]; // check: boolean;
}
const initialState: NotificationsPageState = {
  filteredNotifications: [],
  notifications: [],
  // check: false,
};

export const notificationsPageReducer: Reducer<
  NotificationsPageState | undefined,
  NotificationsPageActions
> = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
        filteredNotifications: action.payload,
      };
    case FILTER_NOTIFICATIONS:
      return {
        ...state,
        filteredNotifications: action.payload,
      };
    default:
      return state;
  }
};
