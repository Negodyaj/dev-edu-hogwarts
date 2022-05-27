import { NotificationData } from '../components/NotificationsContainer/NotificationItem/NotificationItem';

export const ADD_NOTIFICATION = 'ADD_NOTIFICATION' as const;

export const addNotification = (notification: NotificationData) => ({
  type: ADD_NOTIFICATION,
  payload: notification,
});

export type NotificationsContainerActions = ReturnType<typeof addNotification>;
