// eslint-disable-next-line @typescript-eslint/naming-convention
export const NAV_ACTIONS = ['toggle', 'open', 'close', 'close-group', 'close-all'] as const;
export type NavAction = typeof NAV_ACTIONS[number];

