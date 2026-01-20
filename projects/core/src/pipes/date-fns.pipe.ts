import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';

@Pipe({
    name: 'dateFns'
})
export class DateFnsPipe implements PipeTransform {

    /**
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
