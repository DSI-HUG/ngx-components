// eslint-disable-next-line @typescript-eslint/naming-convention
export const PANEL_TRIGGER_MODES = ['click', 'hover'] as const;
export type PanelTriggerMode = typeof PANEL_TRIGGER_MODES[number];
