import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { form, FormField } from '@angular/forms/signals';
import { MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgxDatepickerMaskDirective, NgxDatepickerWithTimeComponent } from '@hug/ngx-date-picker';

import { DatePickerInputs, StartView } from '../date-picker/date-picker.component';
import { DatePrinterComponent } from '../date-printer/date-printer.component';

export type { DatePickerInputs, StartView };

@Component({
    selector: 'date-picker-form-signals',
    imports: [
        DatePrinterComponent,
        FormsModule,
        FormField,
        MatDatepicker,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatFormField,
        MatInput,
        MatLabel,
        MatSuffix,
        NgxDatepickerMaskDirective,
        NgxDatepickerWithTimeComponent
    ],
    templateUrl: './date-picker-form-signals.component.html',
    styleUrl: './date-picker-form-signals.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatePickerFormSignalsComponent {

    public startView = input<StartView>('month');

    public value = input<Date>();

    protected readonly hasMonth: boolean;
    protected readonly hasDay: boolean;
    protected readonly hasTime: boolean;

    /** Signal-Forms model: source of truth for the date input value. */
    protected readonly dateModel = signal<Date | undefined>(undefined);

    /** Signal-Forms FieldTree built from the model. Used in the template via [formField]. */
    protected readonly dateForm = form(this.dateModel);

    /** Computed value, exposed for the template (replaces dateControl.value). */
    protected readonly currentValue = computed(() => this.dateModel());

    private readonly matDateFormats = inject<MatDateFormats>(MAT_DATE_FORMATS);

    public constructor() {
        console.debug('Provided MatDateFormats:', this.matDateFormats);
        const dateInput = String(this.matDateFormats.parse.dateInput) ?? String(this.matDateFormats.display.dateInput);
        const timeInput = String(this.matDateFormats.parse.timeInput) ?? String(this.matDateFormats.display.timeInput);
        this.hasMonth = dateInput.includes('MM') || dateInput.includes('P');
        this.hasDay = dateInput.includes('dd') || dateInput.includes('P');
        this.hasTime = dateInput.includes('HH') || dateInput.includes('p') || timeInput.includes('p');

        // Sync the input() into the signal-form model.
        effect(() => this.dateModel.set(this.value()));
    }

    protected monthSelected(date: Date, datepicker: MatDatepicker<Date>): void {
        if (!this.hasDay) {
            this.dateModel.set(new Date(date.getFullYear(), date.getMonth()));
            datepicker.close();
        }
    }

    protected yearSelected(date: Date, datepicker: MatDatepicker<Date>): void {
        if (!this.hasMonth) {
            this.dateModel.set(new Date(date.getFullYear(), 0));
            datepicker.close();
        }
    }
}

