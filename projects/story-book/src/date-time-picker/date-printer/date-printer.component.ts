/* disable @typescript-eslint/naming-convention */
import { DatePipe, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr-CH';
import { ChangeDetectionStrategy, Component, inject, input, LOCALE_ID } from '@angular/core';
import { NgxDateFnsPipe } from '@hug/ngx-core';
import { setDefaultOptions } from 'date-fns';
import { frCH } from 'date-fns/locale';

registerLocaleData(localeFr);
setDefaultOptions({ locale: frCH });
@Component({
    selector: 'date-printer',
    imports: [
        NgxDateFnsPipe,
        DatePipe
    ],
    templateUrl: './date-printer.component.html',
    styleUrl: './date-printer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatePrinterComponent {
    public value = input<Date | undefined>();
    protected readonly locale = inject(LOCALE_ID);
    protected readonly dateFnsPatterns = ['PPPPpppp', 'PPPPpp', 'PPPp', 'Pp', 'PPPP', 'PPP', 'PP', 'P'];
    protected readonly angularFormats = ['full', 'long', 'medium', 'short', 'fullDate', 'longDate', 'mediumDate', 'shortDate'];
}
