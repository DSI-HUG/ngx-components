import { Inject, Injectable, InjectionToken, Optional, Type } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { Locale, format, isValid, setHours, setMinutes, setSeconds } from 'date-fns';

import { DateTimeAdapter } from './date-time-adapter';
import { validateAndParseDateStr } from './date.util';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ACCEPTED_NON_DATE_VALUES = new InjectionToken<readonly (string | RegExp)[]>('ACCEPTED_NON_DATE_VALUES');
// eslint-disable-next-line @typescript-eslint/naming-convention
export const MULTI_FORMAT_ACCEPTED_FORMATS = new InjectionToken<readonly string[]>('MULTI_FORMAT_ACCEPTED_FORMATS');
// eslint-disable-next-line @typescript-eslint/naming-convention
export const MULTI_FORMAT_DATE_DELEGATE = new InjectionToken<DateAdapter<Date>>('MULTI_FORMAT_DATE_DELEGATE');

type TypeForAdapter = Date | string;

/**
 * An Angular Material DateAdapter allowing to accept multiple date formats. It also can be used to accept arbitrary strings as valid date values (see ACCEPTED_NON_DATE_VALUES token definition below).
 *
 * Users must provide the following tokens:
 * - MULTI_FORMAT_ACCEPTED_FORMATS: a list of accepted date formats
 * - MULTI_FORMAT_DATE_DELEGATE: the DateAdapter delegate which will be used to delegate operation on date objects
 *
 * Optional tokens are:
 * - MAT_DATE_LOCALE: the locale to use for date object parsing and formatting
 * - ACCEPTED_NON_DATE_VALUES: a list of string or regular expression for accepting arbitrary non date values
 *
 * This adapter accept and produce Date objects or strings
 *
 */
@Injectable()
export class NgxMultiFormatDateAdapter extends DateAdapter<TypeForAdapter, Locale> implements DateTimeAdapter<TypeForAdapter> {

    private delegate: DateAdapter<Date>;

    public constructor(
        @Inject(MULTI_FORMAT_ACCEPTED_FORMATS) private acceptedDateFormats: readonly string[],
        @Inject(MULTI_FORMAT_DATE_DELEGATE) delegateType: Type<DateAdapter<Date>>,
        @Optional() @Inject(MAT_DATE_LOCALE) matDateLocale: Record<string, unknown>,
        @Optional() @Inject(ACCEPTED_NON_DATE_VALUES) private acceptedValues: readonly (string | RegExp)[]
    ) {
        super();
        this.locale = matDateLocale;
        this.delegate = new delegateType(matDateLocale);
    }

    public getYear(date: TypeForAdapter): number {
        return this.appyOnParsed(date, parsed => this.delegate.getYear(parsed), this.delegate.getYear(new Date()));
    }

    public getMonth(date: TypeForAdapter): number {
        return this.appyOnParsed(date, parsed => this.delegate.getMonth(parsed), this.delegate.getMonth(new Date()));
    }

    public getDate(date: TypeForAdapter): number {
        return this.appyOnParsed(date, parsed => this.delegate.getDate(parsed), this.delegate.getDate(new Date()));
    }

    public getDayOfWeek(date: TypeForAdapter): number {
        return this.appyOnParsed(date, parsed => this.delegate.getDayOfWeek(parsed), this.delegate.getDayOfWeek(new Date()));
    }

    public getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
        return this.delegate.getMonthNames(style);
    }

    public getDateNames(): string[] {
        return this.delegate.getDateNames();
    }

    public getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
        return this.delegate.getDayOfWeekNames(style);
    }

    public getYearName(date: TypeForAdapter): string {
        return this.appyOnParsed(date, parsed => this.delegate.getYearName(parsed), '');
    }

    public getFirstDayOfWeek(): number {
        return this.delegate.getFirstDayOfWeek();
    }

    public getNumDaysInMonth(date: TypeForAdapter): number {
        return this.appyOnParsed(date, parsed => this.delegate.getNumDaysInMonth(parsed), this.delegate.getNumDaysInMonth(new Date()));
    }

    public clone(date: TypeForAdapter): TypeForAdapter {
        return this.appyOnParsed(date, parsed => this.delegate.clone(parsed), date);
    }

    public createDate(year: number, month: number, date: number): TypeForAdapter {
        return this.delegate.createDate(year, month, date);
    }

    public today(): TypeForAdapter {
        return this.delegate.today();
    }

    public parse(value: unknown): TypeForAdapter | null {
        if (!value) {
            return null;
        }
        if (value instanceof Date) {
            return isValid(value) ? value : this.invalid();
        }
        if (typeof value === 'string') {
            if (this.isAcceptedValue(value)) {
                return value;
            }
            const parsed = this._parse(value);
            if (parsed) {
                return value;
            }
        }
        return this.invalid();
    }

    public format(date: TypeForAdapter, displayFormat: string): string {
        if (!date) {
            return '';
        }
        const parsed = this._parse(date);
        if (date instanceof Date && parsed) {
            return this._format(parsed, displayFormat) || '';
        }
        if (date && this.isValid(date)) {
            return date.toLocaleString();
        }
        return '';
    }

    public addCalendarYears(date: TypeForAdapter, years: number): TypeForAdapter {
        return this.appyOnParsed(date, parsed => this.delegate.addCalendarYears(parsed, years), date);
    }

    public addCalendarMonths(date: TypeForAdapter, months: number): TypeForAdapter {
        return this.appyOnParsed(date, parsed => this.delegate.addCalendarMonths(parsed, months), date);
    }

    public addCalendarDays(date: TypeForAdapter, days: number): TypeForAdapter {
        return this.appyOnParsed(date, parsed => this.delegate.addCalendarDays(parsed, days), date);
    }

    public toIso8601(date: TypeForAdapter): string {
        const parsed = this._parse(date);
        if (!parsed) {
            return '';
        }
        return this.delegate.toIso8601(parsed);
    }

    public isDateInstance(obj: unknown): boolean {
        const isString = typeof obj === 'string';
        if (isString || obj instanceof Date || typeof obj === 'number') {
            return isString && this.isAcceptedValue(obj) || !!this._parse(obj);
        }
        return false;
    }

    public isValid(date: TypeForAdapter): boolean {
        return this.isAcceptedValue(date) || !!this._parse(date);
    }

    public invalid(): TypeForAdapter {
        return 'Invalide';
    }

    public setHours(date: TypeForAdapter, hours: number): TypeForAdapter {
        return this.appyOnParsed(date, parsed => setHours(parsed, hours || 0), date);
    }

    public setMinutes(date: TypeForAdapter, minutes: number): TypeForAdapter {
        return this.appyOnParsed(date, parsed => setMinutes(parsed, minutes || 0), date);
    }

    public setSeconds(date: TypeForAdapter, seconds: number): TypeForAdapter {
        return this.appyOnParsed(date, parsed => setSeconds(parsed, seconds || 0), date);
    }

    public setTime(date: TypeForAdapter, hours: number, minutes: number, seconds: number): TypeForAdapter {
        date = this.setHours(date, hours);
        date = this.setMinutes(date, minutes);
        date = this.setSeconds(date, seconds);
        return date;
    }

    public override compareDate(first: TypeForAdapter, second: TypeForAdapter): number {
        if (typeof first === 'string' && typeof second === 'string') {
            return first.localeCompare(second);
        }
        const parsedFirst = this._parse(first);
        const parsedSecond = this._parse(second);
        if (!parsedFirst || !parsedSecond) {
            return 0;
        }
        if (!parsedFirst) {
            return -1;
        }
        if (!parsedSecond) {
            return 1;
        }
        return this.delegate.compareDate(parsedFirst, parsedSecond);
    }

    private isAcceptedValue(value: TypeForAdapter): boolean {
        if (value instanceof Date) {
            return false;
        }
        return this.acceptedValues?.some(acceptedValue => acceptedValue instanceof RegExp ? acceptedValue.test(value) : acceptedValue === value) ?? false;
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    private _parse(value: unknown): Date | undefined {
        return validateAndParseDateStr(value, this.acceptedDateFormats, this.locale);
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    private _format(value: Date, dateFormat?: string): string | undefined {
        if (!isValid(value)) {
            return undefined;
        }
        if (!dateFormat) {
            return value.toDateString();
        }
        return format(value, dateFormat, { locale: this.locale });
    }

    private appyOnParsed<T>(date: TypeForAdapter, fn: (d: Date) => T, defaultReturnValue: T): T {
        const parsed = this._parse(date);
        if (!parsed) {
            return defaultReturnValue;
        }
        return fn(parsed);
    }
}

