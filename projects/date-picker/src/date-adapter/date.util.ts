import { isMatch as isMatchFns, isValid, parse, toDate } from 'date-fns';

const yearFormat = 'yyyy';
const yearPattern = '[0-9]{4}';
const otherThanYearPatternToFind = '[dmMLsHXZ]+';
const otherThanYearPatternToReplace = '[A-Za-z0-9éû]*';


export const isMatch = (dateString: string, formatString: string, locale: Locale): boolean => isMatchFns(dateString, formatString, { locale: locale });

/**
 * Check, if a year is expected in dateString, if dateString include the year on 4 digit. Return false for Oct 20, true for Oct 2020.
 * @param dateString The date in its string representation
 * @param formatString The format to analyze
 * @returns true if the format use 'yyyy' and the dateString match it, true if the format does not use the format 'yyyy', false otherwise
 */
const isYearFormatStrictlyMatch = (dateString: string, formatString: string): boolean => {
    let isYearFormatStrictMatch = true;
    if (formatString?.includes(yearFormat)) {
        const otherThanYear = new RegExp(otherThanYearPatternToFind, 'g');
        const onlyYearCapture = formatString.replace(otherThanYear, otherThanYearPatternToReplace).replace(yearFormat, yearPattern);
        const regExpOnlyYear = new RegExp(`^${onlyYearCapture}`);
        isYearFormatStrictMatch = regExpOnlyYear.test(dateString);
    }
    return isYearFormatStrictMatch;
};

export const parseDateStrictly = (dateString: string, formatString: string, locale: Locale): Date | undefined => {
    let date: Date | undefined;
    if (isMatch(dateString, formatString, locale) && isYearFormatStrictlyMatch(dateString, formatString)) {
        date = parse(dateString, formatString, new Date(), { locale: locale });
    }
    return date;
};

const stringToDate = (valueA: string, locale: Locale, acceptedFormatDate?: readonly string[]): Date | undefined => {
    if (!acceptedFormatDate?.length) {
        return undefined;
    }

    return acceptedFormatDate.filterMap(dateFormat => {
        const stringDateToDate = parseDateStrictly(valueA, dateFormat, locale);
        if (isValid(stringDateToDate)) {
            return stringDateToDate;
        }
        return undefined;
    }).shift();
};

export const validateAndParseDateStr = (value: unknown, dateFormats: readonly string[], locale: Locale): Date | undefined => {
    if (value instanceof Date) {
        return value;
    } else {
        let date: Date | undefined;
        if (typeof value === 'number') {
            date = toDate(value);
        } else if (typeof value === 'string') {
            date = stringToDate(value, locale, dateFormats);
        }
        if (isValid(date)) {
            return date;
        }
    }
    return undefined;
};
