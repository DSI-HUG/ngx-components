/* Adds color syntax to string templates */
export const html = (strings: TemplateStringsArray, ...values: unknown[]): string =>
    String.raw(strings, ...values);
