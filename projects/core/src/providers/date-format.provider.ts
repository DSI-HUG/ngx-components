import { MatDateFormats } from '@angular/material/core';

const buildMaskFromParts = (localeId: string, options: Intl.DateTimeFormatOptions): string => {
    const formatter = new Intl.DateTimeFormat(localeId, options);
    const parts = formatter.formatToParts(new Date());

    return parts.map(p => {
        switch (p.type) {
            case 'year': {
                const y = options.year;
                return (y === '2-digit') ? 'yy' : 'yyyy';
            }
            case 'month': {
                const m = options.month;
                if (m === '2-digit') {
                    return 'MM';
                }
                if (m === 'numeric') {
                    return 'M';
                }
                if (m === 'short') {
                    return 'MMM';
                }
                if (m === 'long') {
                    return 'MMMM';
                }
                return 'M';
            }
            case 'day': {
                const d = options.day;
                if (d === '2-digit') {
                    return 'dd';
                }
                if (d === 'numeric') {
                    return 'd';
                }
                return 'd';
            }
            case 'hour': {
                const h = options.hour;
                return (h === '2-digit') ? 'HH' : 'H';
            }
            case 'minute': {
                const m = options.minute;
                return (m === '2-digit') ? 'mm' : 'm';
            }
            case 'second': {
                const s = options.second;
                return (s === '2-digit') ? 'ss' : 's';
            }
            default:
                return p.value;
        }
    }).join('');
};

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

    const dateInput = buildMaskFromParts(localeId, options);
    const monthYearLabel = buildMaskFromParts(localeId, { month: 'short', year: 'numeric' });
    const monthYearA11yLabel = buildMaskFromParts(localeId, { month: 'long', year: 'numeric' });

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
