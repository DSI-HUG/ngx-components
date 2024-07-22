import { InjectionToken } from '@angular/core';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DATE_TIME_ADAPTER = new InjectionToken<DateTimeAdapter<unknown>>('DATE_TIME_ADAPTER');

export interface DateTimeAdapter<D> {
    setHours: (date: D, hours: number) => D;
    setMinutes: (date: D, minutes: number) => D;
    setSeconds: (date: D, seconds: number) => D;
    setTime: (date: D, hours: number, minutes: number, seconds: number) => D;
}
