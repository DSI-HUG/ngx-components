import { inject, Injectable, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';
import { de, enUS, frCH } from 'date-fns/locale';

@Injectable()
@Pipe({
    name: 'ngxDate'
})
export class NgxDatePipe implements PipeTransform {
    private locale = inject(LOCALE_ID);

    transform(value: Date | undefined, formatString = 'P'): string {
        if (!value) {
            return '';
        }
        let language;
        switch (this.locale) {
            case 'en-US':
                language = enUS;
                break;
            case 'de-CH':
                language = de;
                break;
            default:
                language = frCH;
        }
        return format(value, formatString, { locale: language });
    }
}
