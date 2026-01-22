import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, createEnvironmentInjector, effect, EnvironmentInjector, EnvironmentProviders, inject, Injector, input, LOCALE_ID, Provider, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatOption } from '@angular/material/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { DateFnsAdapter, MAT_DATE_FNS_FORMATS } from '@angular/material-date-fns-adapter';
import { frCH } from 'date-fns/locale';

import { buildNgxMatDateFormatsFactory, NgxDateFormat } from '../../../../core/src/providers/date-format.provider';
import { DatePickerComponent, DatePickerInputs } from '../date-picker/date-picker.component';

type DateFormatOption = NgxDateFormat | 'MAT_DATE_FNS_FORMATS';

@Component({
    selector: 'datepicker-wrapper',
    templateUrl: './datepicker-wrapper.component.html',
    styleUrls: ['./datepicker-wrapper.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatFormField,
        MatLabel,
        MatOption,
        MatSelect,
        ReactiveFormsModule,
        NgComponentOutlet
    ]
})
export class DatepickerWrapperComponent {

    public dateFormat = input<DateFormatOption>('long');

    protected readonly dateFormatOptions: DateFormatOption[] = [
        'full',
        'long',
        'short',
        'monthYearOnly',
        'yearOnly',
        'MAT_DATE_FNS_FORMATS'
    ];

    protected dateFormatControl = new FormControl<DateFormatOption | undefined>(undefined);

    protected datePickerComponent = DatePickerComponent;
    protected datePickerInjector: Signal<Injector>;
    protected datePickerInputs: Signal<DatePickerInputs>;

    private readonly parentInjector = inject(EnvironmentInjector);

    public constructor() {
        effect(() => this.dateFormatControl.patchValue(this.dateFormat()));

        const dateFormatChanged = toSignal(
            this.dateFormatControl.valueChanges,
            {
                initialValue: this.dateFormat()
            }
        );

        this.datePickerInjector = computed(() => {
            const df = dateFormatChanged() || this.dateFormat();

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
            const df = dateFormatChanged() || this.dateFormat();
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
