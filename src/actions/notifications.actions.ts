

export const LOAD_TABS = 'notifications/LOAD_TABS' as const;

export const SELECT_TAB = 'notifications/SELECT_TAB' as const;

export const loadTabs = () => ({
  type: LOAD_TABS
});



export const selectTab = (id: number) => ({
  type: SELECT_TAB,
  payload: id,
});

export type NotificationsPageAction = 
  ReturnType<typeof loadTabs> | 
  ReturnType<typeof selectTab>;
