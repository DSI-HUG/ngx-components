import { Pipe, PipeTransform } from '@angular/core';
import { format, isDate } from 'date-fns';

@Pipe({
    name: 'ngxDateFns'
})
export class NgxDateFnsPipe implements PipeTransform {

    /**
     * Pipe to format a Date using date-fns.
     *
     * @param value - Date to format
     * @param pattern - see https://date-fns.org/v4.1.0/docs/format
     * @return {string} Formatted date string
     */
    transform(value: Date | null | undefined, pattern = 'P'): string {
        if (!value || !isDate(value)) {
            return '';
        }
        return format(value, pattern);
    }
}
