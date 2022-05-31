export const COLLAPSE_PANEL = 'mainPanel/COLLAPSE_PANEL' as const;
export const CHANGE_DARK_MODE = 'mainPanel/CHANGE_DARK_MODE' as const;

export const collapseMainPanel = (collapse: boolean) => ({
  type: COLLAPSE_PANEL,
  payload: collapse,
});

export const changeDarkMode = (isDark: boolean) => ({
  type: CHANGE_DARK_MODE,
  payload: isDark,
});

export type MainPanelAction =
  | ReturnType<typeof collapseMainPanel>
  | ReturnType<typeof changeDarkMode>;
