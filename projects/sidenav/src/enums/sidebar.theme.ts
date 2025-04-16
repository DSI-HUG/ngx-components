// eslint-disable-next-line @typescript-eslint/naming-convention
export const SIDEBAR_THEMES = ['none', 'dark', 'light'] as const;
export type SidebarTheme = typeof SIDEBAR_THEMES[number];
