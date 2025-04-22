// eslint-disable-next-line @typescript-eslint/naming-convention
export const NAV_BUTTON_VERSION = ['nav-button', 'nav-icon-button'] as const;
export type NavButtonVersion = typeof NAV_BUTTON_VERSION[number];

// eslint-disable-next-line @typescript-eslint/naming-convention
export const NAV_BUTTON_VERSION_WITH_ALL = ['all', ...NAV_BUTTON_VERSION] as const;
export type NavButtonVersionWithAll = typeof NAV_BUTTON_VERSION_WITH_ALL[number];
