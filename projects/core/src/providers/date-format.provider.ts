import { MatDateFormats } from '@angular/material/core';

/**
 * A regex to match a word and any non-whitespace around (i.e.: `Test.`, `?test!`).
 */
const anyWordPattern = /\S?[a-zA-Z]+\S?/;

/**
 * Performs a canonical decomposition (NFD) on value + removes all glyphs (diacritic marks, signs, accents).
 * @param value the value to normalize.
 */
const normalizeStr = (value: string): string => value.normalize('NFD').replace(/\p{Diacritic}/gu, '');

const toStrWithZeroPadded = (value: number, maxLength: number): string => value.toString().padStart(maxLength, '0');

const to2DigitsStr = (value: number): string => toStrWithZeroPadded(value, 2);

const to4DigitsStr = (value: number): string => toStrWithZeroPadded(value, 4);

/**
 * Supported date formats.
 */
export type NgxDateFormat = 'full' | 'long' | 'short' | 'monthYearOnly' | 'yearOnly';

/**
 * Build a factory for MAT_DATE_FORMATS like `yyyy.MM.dd HH:mm:ss`.
 * <br>Only works with <b>Latin alphabet</b>.
 * @param dateFormat the date format to use.
 */
export const buildNgxMatDateFormatsFactory = (dateFormat: NgxDateFormat) => (localeId: string): MatDateFormats => {
    const date = new Date(2025, 10, 22, 7, 45, 33);

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        hour12: false
    };

    switch (dateFormat) {
        case 'full':
            options.month = '2-digit';
            options.day = '2-digit';
            options.hour = '2-digit';
            options.minute = '2-digit';
            options.second = '2-digit';
            break;
        case 'long':
            options.month = '2-digit';
            options.day = '2-digit';
            options.hour = '2-digit';
            options.minute = '2-digit';
            break;
        case 'short':
            options.month = '2-digit';
            options.day = '2-digit';
            break;
        case 'monthYearOnly':
            options.month = '2-digit';
            break;
        default:
            break;
    }

    const dateStr = date.toLocaleString(localeId, options);
    const dateYearStr = to4DigitsStr(date.getFullYear());
    const dateInput = dateStr
        .replace(dateYearStr, 'yyyy')
        .replace(to2DigitsStr(date.getMonth() + 1), 'MM')
        .replace(to2DigitsStr(date.getDate()), 'dd')
        .replace(to2DigitsStr(date.getHours()), 'HH')
        .replace(to2DigitsStr(date.getMinutes()), 'mm')
        .replace(to2DigitsStr(date.getSeconds()), 'ss');

    const dateStrShortMonth = date.toLocaleString(localeId, { month: 'short', year: 'numeric' });
    const monthYearLabel = normalizeStr(dateStrShortMonth)
        .replace(anyWordPattern, 'MMM')
        .replace(dateYearStr, 'yyyy');

    const dateStrLongMonth = date.toLocaleString(localeId, { month: 'long', year: 'numeric' });
    const monthYearA11yLabel = normalizeStr(dateStrLongMonth)
        .replace(anyWordPattern, 'MMMM')
        .replace(dateYearStr, 'yyyy');

    const result: MatDateFormats = {
        parse: {
            dateInput
        },
        display: {
            dateInput,
            monthYearLabel,
            dateA11yLabel: 'LL',
            monthYearA11yLabel
        }
    };
    console.debug('MatDateFormats provided for', dateFormat, 'format and locale', localeId, ':', result);
    return result;
};
