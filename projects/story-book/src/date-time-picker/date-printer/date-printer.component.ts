import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'date-printer',
    imports: [
        DatePipe
    ],
    templateUrl: './date-printer.component.html',
    styleUrl: './date-printer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatePrinterComponent {

    public value = input<Date | null>();

    protected readonly formats = ['full', 'long', 'medium', 'short', 'fullDate', 'longDate', 'mediumDate', 'shortDate'];
}
