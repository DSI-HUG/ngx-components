import { format, Locale } from 'date-fns';
import { enUS } from 'date-fns/locale';

// default Locale in date-fns is en-US: https://github.com/date-fns/date-fns/blob/master/src/format/index.js
let globalLocale: Locale = enUS;

export const setLocale = (locale: Locale): void => {
    globalLocale = locale;
};

export const formatWithLocale = (date: Date | number, dateFormat: string): string => format(date, dateFormat, { locale: globalLocale });
