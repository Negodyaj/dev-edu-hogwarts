export const ADD_NOTIFICATION = 'ADD_NOTIFICATION' as const;

export const addNotification = (notificationType: number) => ({
  type: ADD_NOTIFICATION,
  payload: notificationType,
});

export type NotificationsContainerActions = ReturnType<typeof addNotification>;
