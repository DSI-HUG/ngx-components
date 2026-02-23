import { ChangeDetectionStrategy, Component, effect, inject, input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgxDatepickerMaskDirective, NgxDatepickerWithTimeComponent } from '@hug/ngx-date-picker/m2';

import { DatePrinterComponent } from '../date-printer/date-printer.component';

export type StartView = 'month' | 'year' | 'multi-year';

export type DatePickerInputs = Record<string, unknown> & {
    startView?: StartView;
    value?: Date;
};

@Component({
    selector: 'date-picker',
    imports: [
        DatePrinterComponent,
        FormsModule,
        MatDatepicker,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatFormField,
        MatInput,
        MatLabel,
        MatSuffix,
        NgxDatepickerMaskDirective,
        ReactiveFormsModule,
        NgxDatepickerWithTimeComponent
    ],
    templateUrl: './date-picker.component.html',
    styleUrl: './date-picker.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatePickerComponent {

    public startView = input<StartView>('month');

    public value = input<Date>();

    protected readonly hasMonth: boolean;
    protected readonly hasDay: boolean;
    protected readonly hasTime: boolean;

    protected dateControl = new FormControl<Date | undefined>(undefined, { nonNullable: true });

    private readonly matDateFormats = inject<MatDateFormats>(MAT_DATE_FORMATS);

    public constructor() {
        console.debug('Provided MatDateFormats:', this.matDateFormats);
        const dateInput = String(this.matDateFormats.parse.dateInput) ?? String(this.matDateFormats.display.dateInput);
        const timeInput = String(this.matDateFormats.parse.timeInput) ?? String(this.matDateFormats.display.timeInput);
        this.hasMonth = dateInput.includes('MM') || dateInput.includes('P');
        this.hasDay = dateInput.includes('dd') || dateInput.includes('P');
        this.hasTime = dateInput.includes('HH') || dateInput.includes('p') || timeInput.includes('p');

        effect(() => this.dateControl.patchValue(this.value()));
    }

    protected monthSelected(date: Date, datepicker: MatDatepicker<Date>): void {
        if (!this.hasDay) {
            this.dateControl.patchValue(new Date(date.getFullYear(), date.getMonth()));
            datepicker.close();
        }
    }

    protected yearSelected(date: Date, datepicker: MatDatepicker<Date>): void {
        if (!this.hasMonth) {
            this.dateControl.patchValue(new Date(date.getFullYear(), 0));
            datepicker.close();
        }
    }
}
