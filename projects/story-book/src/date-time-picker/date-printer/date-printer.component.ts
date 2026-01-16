import { ChangeDetectionStrategy, Component, inject, input, LOCALE_ID } from '@angular/core';
import { DateFnsPipe } from '@hug/ngx-core';

@Component({
    selector: 'date-printer',
    imports: [
        DateFnsPipe
    ],
    templateUrl: './date-printer.component.html',
    styleUrl: './date-printer.component.scss',
    providers: [{ provide: LOCALE_ID, useValue: 'de-CH' }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatePrinterComponent {
    public value = input<Date | undefined>();
    protected readonly formats = ['PPPPpppp', 'PPPPpp', 'PPPp', 'Pp', 'PPPP', 'PPP', 'PP', 'P'];
    protected readonly locale = inject(LOCALE_ID);
}
