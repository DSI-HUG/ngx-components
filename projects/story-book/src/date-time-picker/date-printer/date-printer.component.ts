import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgxDatePipe } from '@hug/ngx-core/src/pipes/date.pipe';

@Component({
    selector: 'date-printer',
    imports: [
        NgxDatePipe
    ],
    templateUrl: './date-printer.component.html',
    styleUrl: './date-printer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatePrinterComponent {

    public value = input<Date | null>();

    protected readonly formats = ['full', 'long', 'medium', 'short', 'fullDate', 'longDate', 'mediumDate', 'shortDate'];
    protected readonly locales = ['en', 'fr-CH', 'de-CH'];
}
