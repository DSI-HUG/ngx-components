import { registerLocaleData } from '@angular/common';
import localeFrExtra from '@angular/common/locales/extra/fr-CH';
import localeFr from '@angular/common/locales/fr-CH';
import { FormsModule } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { NgxDatepickerWithTimeComponent } from '../../../date-picker/src/datepicker-with-time/datepicker-with-time.component';
import { NgxNumericStepperComponent } from '../../../numeric-stepper/src/numeric-stepper.component';

registerLocaleData(localeFr, 'fr-CH', localeFrExtra);

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
                NoopAnimationsModule,
                MatDatepickerModule,
                MatIconModule,
                MatInputModule,
                MatFormFieldModule,
                NgxNumericStepperComponent
            ],
            providers: [
                { provide: DateAdapter, useClass: CustomDateAdapter },
                {
                    provide: MAT_DATE_FORMATS,
                    useValue: MAT_NATIVE_DATE_FORMATS
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
            value: new Date(),
            appearance: 'outline'
        },
        template: `
            <mat-form-field [appearance]="appearance">
                <mat-label>DatetimePicker</mat-label>
                <input matInput [(ngModel)]="value" [matDatepicker]="picker" />
                <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
                <mat-datepicker #picker>
                    <ngx-datepicker-with-time></ngx-datepicker-with-time>
                </mat-datepicker>
            </mat-form-field>
          `
    })
};
