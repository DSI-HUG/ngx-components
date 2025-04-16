// eslint-disable-next-line @typescript-eslint/naming-convention
export const NAV_ITEM_STATES = ['enabled', 'selected', 'disabled', 'pressed', 'focused', 'hovered'] as const;
export type NavItemState = typeof NAV_ITEM_STATES[number];
