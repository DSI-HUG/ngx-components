import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, createEnvironmentInjector, effect, EnvironmentInjector, EnvironmentProviders, inject, Injector, input, LOCALE_ID, Provider, Signal, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatOption } from '@angular/material/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { DateFnsAdapter, MAT_DATE_FNS_FORMATS } from '@angular/material-date-fns-adapter';
import { frCH } from 'date-fns/locale';

import { buildNgxMatDateFormatsFactory, NgxDateFormat } from '../../../../core/src/providers/date-format.provider';
import { DatePickerInputs } from '../date-picker/date-picker.component';
import { DatePickerFormSignalsComponent } from '../date-picker-form-signals/date-picker-form-signals.component';

type DateFormatOption = NgxDateFormat | 'MAT_DATE_FNS_FORMATS';

@Component({
    selector: 'datepicker-wrapper-form-signals',
    templateUrl: './datepicker-wrapper-form-signals.component.html',
    styleUrls: ['./datepicker-wrapper-form-signals.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatFormField,
        MatLabel,
        MatOption,
        MatSelect,
        FormField,
        NgComponentOutlet
    ]
})
export class DatepickerWrapperFormSignalsComponent {

    public dateFormat = input<DateFormatOption>('long');

    protected readonly dateFormatOptions: DateFormatOption[] = [
        'full',
        'long',
        'short',
        'monthYearOnly',
        'yearOnly',
        'MAT_DATE_FNS_FORMATS'
    ];

    protected readonly dateFormatModel = signal<DateFormatOption | undefined>(undefined);
    protected readonly dateFormatForm = form(this.dateFormatModel);

    protected datePickerComponent = DatePickerFormSignalsComponent;
    protected datePickerInjector: Signal<Injector>;
    protected datePickerInputs: Signal<DatePickerInputs>;

    private readonly parentInjector = inject(EnvironmentInjector);

    public constructor() {
        effect(() => this.dateFormatModel.set(this.dateFormat()));

        this.datePickerInjector = computed(() => {
            const df = this.dateFormatModel() || this.dateFormat();

            let matDateFormatProvider: (Provider | EnvironmentProviders);
            if (df === 'MAT_DATE_FNS_FORMATS') {
                matDateFormatProvider = {
                    provide: MAT_DATE_FORMATS,
                    useValue: MAT_DATE_FNS_FORMATS
                };
            } else {
                matDateFormatProvider = {
                    provide: MAT_DATE_FORMATS,
                    useFactory: buildNgxMatDateFormatsFactory(df),
                    deps: [LOCALE_ID]
                };
            }

            return createEnvironmentInjector([
                { provide: LOCALE_ID, useValue: 'fr-CH' },
                matDateFormatProvider,
                {
                    provide: MAT_DATE_LOCALE,
                    useValue: frCH
                },
                {
                    provide: DateAdapter,
                    useClass: DateFnsAdapter,
                    deps: [MAT_DATE_LOCALE]
                }
            ], this.parentInjector);
        });

        this.datePickerInputs = computed<DatePickerInputs>(() => {
            const df = this.dateFormatModel() || this.dateFormat();
            const now = new Date();
            switch (df) {
                case 'yearOnly':
                    return {
                        startView: 'multi-year',
                        value: new Date(now.getFullYear(), 0)
                    };
                case 'monthYearOnly':
                    return {
                        startView: 'multi-year',
                        value: new Date(now.getFullYear(), now.getMonth())
                    };
                default:
                    return {
                        startView: 'month',
                        value: now
                    };
            }
        });
    }
}

