import { NotificationResponse } from '../models/responses/NotificationResponse';

export const SET_NOTIFICATIONS = 'notifications/SET_NOTIFICATIONS' as const;
export const CHECK_NOTIFICATIONS = 'notifications/CHECK_NOTIFICATIONS' as const;

export const setNotifications = (notifications: NotificationResponse[]) => ({
  type: SET_NOTIFICATIONS,
  payload: notifications,
});

// export const checkNotification = (notificationId: number) => ({
//   type: CHECK_NOTIFICATIONS,
//   payload: notificationId,
// });
export type NotificationsPageAction = ReturnType<typeof setNotifications>;
