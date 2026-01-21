import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';

@Pipe({
    name: 'ngxDateFns'
})
export class DateFnsPipe implements PipeTransform {

    /**
     * Pipe to format a Date using date-fns.
     *
     * @param value - Date to format
     * @param pattern - see https://date-fns.org/v4.1.0/docs/format
     * @return {string} Formatted date string
     */
    transform(value: Date | undefined, pattern = 'P'): string {
        if (!value) {
            return '';
        }
        return format(value, pattern);
    }
}
