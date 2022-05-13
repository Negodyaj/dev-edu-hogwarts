import { NotificationData } from '../pages/NotificationsPage/components/NotificationsCard';
import { NotificationResponse } from '../models/responses/NotificationResponse';

export const SET_NOTIFICATIONS = 'notifications/SET_NOTIFICATIONS' as const;
export const FILTER_NOTIFICATIONS = 'notifications/FILTER_NOTIFICATIONS' as const;
export const CHECK_NOTIFICATIONS = 'notifications/CHECK_NOTIFICATIONS' as const;

export const setNotifications = (notifications: NotificationResponse[]) => ({
  type: SET_NOTIFICATIONS,
  payload: notifications,
});

export const filterNotification = (filterednotifications: NotificationData[]) => ({
  type: FILTER_NOTIFICATIONS,
  payload: filterednotifications,
});
// export const checkNotification = (notificationId: number) => ({
//   type: CHECK_NOTIFICATIONS,
//   payload: notificationId,
// });

export type NotificationsPageActions =
  | ReturnType<typeof setNotifications>
  | ReturnType<typeof filterNotification>;
