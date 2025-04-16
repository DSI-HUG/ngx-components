// eslint-disable-next-line @typescript-eslint/naming-convention
export const PANEL_TYPES = [
    'overlay-open-right',
    'overlay-open-left',
    'fixed-open-right',
    'fixed-open-left',
    'open-right',
    'open-left'
] as const;
export type PanelType = typeof PANEL_TYPES[number];
