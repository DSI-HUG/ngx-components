import { first, isArray } from 'lodash-es';

export const property = (key: string, value: unknown): string => {
    if (isArray(value)) {
        return `[${key}]="${first(value) ?? key}"`;
    } else if (value) {
        return `${key}="${value as string}"`;
    } else {
        return '';
    }
};
/**
 * Require dynamic instance of DynamicRefsComponent
 * @param key
 * @param value
 * @param source
 */
export const refs = (key: string, value: unknown, source = 'dynamic'): string => {
    if (isArray(value)) {
        const f = first(value) as string | undefined;
        if (!f?.includes('\'')) {
            return `[${key}]="${f}"`;
        } else {
            return `[${key}]="${source}.getRef(${key})"`;
        }
    } else if (value) {
        return `${key}="${value as string}"`;
    } else {
        return '';
    }
};
/**
 * Require templates instance of ContentTemplatesComponent
 * @param key
 * @param value
 */
export const template = (key: string, value: unknown): string =>
    refs(key, value, 'templates');

export const renderTools = { property, refs, template };
