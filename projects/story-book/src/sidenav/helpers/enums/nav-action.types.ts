/* eslint-disable @typescript-eslint/naming-convention */
export const NAV_ACTION_CONTAINER = ['panelRight', 'panelLeft'] as const;
export type NavActionContainer = typeof NAV_ACTION_CONTAINER[number];
