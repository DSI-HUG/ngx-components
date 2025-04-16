// eslint-disable-next-line @typescript-eslint/naming-convention
export const SIDEBAR_POSITIONS = ['overlay', 'fixed', 'relative'] as const;
export type SidebarPosition = typeof SIDEBAR_POSITIONS[number];
