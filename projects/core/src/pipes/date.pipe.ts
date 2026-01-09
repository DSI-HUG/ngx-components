import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';

@Pipe({
    name: 'ngxDate'
})
export class NgxDatePipe implements PipeTransform {
    transform(value: Date | undefined, formatString = 'P'): string {
        if (!value) {
            return '';
        }
        return format(value, formatString);
    }
}
