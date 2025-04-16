// eslint-disable-next-line @typescript-eslint/naming-convention
export const SIDEBAR_DIRECTIONS = ['horizontal', 'vertical'] as const;
export type SidebarDirection = typeof SIDEBAR_DIRECTIONS[number];
