import { NotificationData } from '../pages/NotificationsPage/components/NotificationsCard';
import { NotificationResponse } from '../models/responses/NotificationResponse';

export const SET_NOTIFICATIONS = 'notifications/SET_NOTIFICATIONS' as const;
export const FILTER_NOTIFICATIONS = 'notifications/FILTER_NOTIFICATIONS' as const;
export const SET_NOTIFICATIONS = 'notifications/SET_NOTIFICATIONS' as const;
export const CHECK_NOTIFICATIONS = 'notifications/CHECK_NOTIFICATIONS' as const;

export const setNotifications = (notifications: NotificationData[]) => ({
  type: SET_NOTIFICATIONS,
  payload: notifications,
export const setNotifications = (notifications: NotificationResponse[]) => ({
  type: SET_NOTIFICATIONS,
  payload: notifications,
});

export const filterNotification = (notifications: NotificationData[]) => ({
  type: FILTER_NOTIFICATIONS,
  payload: notifications,
});
// export const checkNotification = (notificationId: number) => ({
//   type: CHECK_NOTIFICATIONS,
//   payload: notificationId,
// });
export type NotificationsPageAction = ReturnType<typeof setNotifications>;

export type NotificationsPageActions =
  | ReturnType<typeof setNotifications>
  | ReturnType<typeof filterNotification>;
