

export const LOAD_HWCARDS = 'notifications/LOAD_HWCARDS' as const;
export const SELECT_HWCARD = 'notifications/SELECT_HWCARD' as const;

export const loadHWCards = () => ({
  type: LOAD_HWCARDS
});


export const selectCard = (id: number) => ({
  type: SELECT_HWCARD,
  payload: id,
});

export type NotificationsPageAction = 
  ReturnType<typeof loadHWCards> | 
  ReturnType<typeof selectCard>;