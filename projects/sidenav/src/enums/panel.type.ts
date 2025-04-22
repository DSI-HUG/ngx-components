// eslint-disable-next-line @typescript-eslint/naming-convention
export const PANEL_TYPES = [
    'open-right-overlay',
    'open-left-overlay',
    'open-right-fixed',
    'open-left-fixed',
    'open-right-border',
    'open-left-border',
    'open-right-m3',
    'open-left-m3',
    'open-right',
    'open-left'
] as const;
export type PanelType = typeof PANEL_TYPES[number];
