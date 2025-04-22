// eslint-disable-next-line @typescript-eslint/naming-convention
export const NAV_BUTTON_TYPE = ['directive', 'component'] as const;
export type NavButtonType = typeof NAV_BUTTON_TYPE[number];

// eslint-disable-next-line @typescript-eslint/naming-convention
export const NAV_BUTTON_TYPE_WITH_ALL = ['all', ...NAV_BUTTON_TYPE] as const;
export type NavButtonTypeWithAll = typeof NAV_BUTTON_TYPE_WITH_ALL[number];
