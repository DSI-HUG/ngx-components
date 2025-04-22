// eslint-disable-next-line @typescript-eslint/naming-convention
export const NAV_BUTTON_STATES = ['enabled', 'selected', 'disabled', 'pressed', 'focused', 'hovered'] as const;
export type NavButtonState = typeof NAV_BUTTON_STATES[number];
