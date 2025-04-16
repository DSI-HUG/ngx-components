// eslint-disable-next-line @typescript-eslint/naming-convention
export const PANEL_THEMES = ['none', 'm3'] as const;
export type PanelTheme = typeof PANEL_THEMES[number];
