import { registerLocaleData } from '@angular/common';
import localeFrChExtra from '@angular/common/locales/extra/fr-CH';
import localeFrCh from '@angular/common/locales/fr-CH';
import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateFnsAdapter, MAT_DATE_FNS_FORMATS } from '@angular/material-date-fns-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { setDefaultOptions } from 'date-fns';
import { frCH } from 'date-fns/locale';

import { NgxDatepickerWithTimeComponent } from '../../../date-picker/m2/datepicker-with-time/datepicker-with-time.component';
import { DatepickerWrapperComponent } from './datepicker-wrapper-component/datepicker-wrapper.component';

setDefaultOptions({ locale: frCH });
registerLocaleData(localeFrCh, 'fr-CH', localeFrChExtra);

const meta: Meta<NgxDatepickerWithTimeComponent> = {
    title: 'Components/DateTimePicker',
    component: NgxDatepickerWithTimeComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [
                FormsModule,
                MatDatepickerModule,
                MatIconModule,
                MatInputModule,
                MatFormFieldModule
            ],
            providers: [
                { provide: LOCALE_ID, useValue: 'fr-CH' },
                { provide: MAT_DATE_LOCALE, useValue: frCH },
                { provide: MAT_DATE_FORMATS, useValue: MAT_DATE_FNS_FORMATS },
                { provide: DateAdapter, useClass: DateFnsAdapter, deps: [MAT_DATE_LOCALE] }
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

export const withMask: Story = {
    decorators: [
        moduleMetadata({
            imports: [
                DatepickerWrapperComponent
            ]
        })
    ],
    render: args => ({
        props: {
            ...args
        },
        template: `
            <datepicker-wrapper></datepicker-wrapper>
          `
    })
};
