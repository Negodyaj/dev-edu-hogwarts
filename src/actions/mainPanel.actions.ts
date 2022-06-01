export const COLLAPSE_PANEL = 'mainPanel/COLLAPSE_PANEL' as const;
export const collapseMainPanel = (collapse: boolean) => ({
  type: COLLAPSE_PANEL,
  payload: collapse,
});

export type MainPanelAction = ReturnType<typeof collapseMainPanel>;
