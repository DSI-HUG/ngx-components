import { registerLocaleData } from '@angular/common';
import localeFrExtra from '@angular/common/locales/extra/fr-CH';
import localeFr from '@angular/common/locales/fr-CH';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, NativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DateFnsAdapter } from '@angular/material-date-fns-adapter';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { frCH } from 'date-fns/locale';

import { NgxDatepickerButtonsComponent } from '../../../date-picker/src/datepicker-buttons/datepicker-buttons.component';
import { NgxDatepickerMaskDirective } from '../../../date-picker/src/datepicker-mask/datepicker-mask.directive';
import { NgxDatepickerWithTimeComponent } from '../../../date-picker/src/datepicker-with-time/datepicker-with-time.component';
import { NgxNumericStepperComponent } from '../../../numeric-stepper/src/numeric-stepper.component';

registerLocaleData(localeFr, 'fr-CH', localeFrExtra);

export class DejaDateAdapter extends DateFnsAdapter {
    public override sameDate(first: Date | null, second: Date | null): boolean {
        return first?.getTime() === second?.getTime();
    }

    public override compareDate(first: Date, second: Date): number {
        return first && second ? first.getTime() - second.getTime() : 0;
    }

    public override getFirstDayOfWeek(): number {
        return 1;
    }
}

export class CustomDateAdapter extends NativeDateAdapter {
    public override format(date: Date, _displayFormat: string): string {
        return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    }
}

const meta: Meta<NgxDatepickerWithTimeComponent> = {
    title: 'Components/DateTimePicker',
    component: NgxDatepickerWithTimeComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [
                FormsModule,
                ReactiveFormsModule,
                NoopAnimationsModule,
                MatIconModule,
                MatInputModule,
                MatFormFieldModule,
                // Material Datepicker
                MatDatepickerModule,
                NgxDatepickerMaskDirective,
                NgxDatepickerButtonsComponent,
                NgxNumericStepperComponent
            ],
            providers: [
                { provide: MAT_DATE_LOCALE, useValue: frCH },
                { provide: DateAdapter, useClass: DejaDateAdapter },
                {
                    provide: MAT_DATE_FORMATS,
                    useValue: {
                        parse: {
                            dateInput: 'dd.MM.yyyy HH:mm'
                        },
                        display: {
                            dateInput: 'dd.MM.yyyy HH:mm',
                            monthYearLabel: 'MMM yyyy',
                            dateA11yLabel: 'LL',
                            monthYearA11yLabel: 'MMMM yyyy'
                        }
                    }
                }
            ]
        })
    ],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'The `NgxDatepickerWithTimeComponent` utilizes `MatDatepicker` and `NgxNumericStepper` to extend the classic DatePicker with TimePicker functionality.<br /><b>Note:</b> The Angular `NativeDateAdapter` does not support time format. You must use Moment, DateFns, or a custom date adapter to enable this feature.'
            }
        }
    }
};

export default meta;
type Story = StoryObj<NgxDatepickerWithTimeComponent>;

export const standard: Story = {
    render: args => ({
        props: {
            ...args,
            control: new FormControl(new Date()),
            appearance: 'outline'
        },
        template: `
            <mat-form-field [appearance]="appearance">
                <mat-label>DatetimePicker</mat-label>
                <input #input="matInput" matInput type="text" [formControl]="control" [matDatepicker]="picker" dateTimeFormat />
                <ngx-datepicker-buttons matSuffix [forPicker]="picker" [forInput]="input"></ngx-datepicker-buttons>
                <mat-datepicker #picker>
                    <ngx-datepicker-with-time></ngx-datepicker-with-time>
                </mat-datepicker>
            </mat-form-field>
            <pre>{{ control.value }}</pre>
          `
    })
};
