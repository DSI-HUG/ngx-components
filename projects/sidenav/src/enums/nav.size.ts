// eslint-disable-next-line @typescript-eslint/naming-convention
export const NAV_SIZES = ['XS', 'S', 'M', 'L', 'XL'] as const;
export type NavSize = typeof NAV_SIZES[number];
