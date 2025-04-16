// eslint-disable-next-line @typescript-eslint/naming-convention
export const SIDEBAR_LOCATIONS = ['top', 'bottom', 'right', 'left'] as const;
export type SidebarLocation = typeof SIDEBAR_LOCATIONS[number];
