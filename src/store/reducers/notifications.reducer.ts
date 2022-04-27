import { Reducer } from 'redux';
import {
  SET_NOTIFICATIONS,
  NotificationsPageActions,
  FILTER_NOTIFICATIONS,
} from '../../actions/notifications.actions';
import { NotificationData } from '../../pages/NotificationsPage/components/NotificationsCard';

export interface NotificationsPageState {
  notifications: NotificationData[];
  filteredNotifications: NotificationData[];
}
const initialState: NotificationsPageState = {
  filteredNotifications: [],
  notifications: [],
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
