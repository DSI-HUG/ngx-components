import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, LOCALE_ID } from '@angular/core';
import { NgxDateFnsPipe } from '@hug/ngx-core';

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
