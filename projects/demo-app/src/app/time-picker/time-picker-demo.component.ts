/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { DatePipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxTimePickerComponent } from '@hug/ngx-time-picker';

export const myFormats = {
    parse: {
        dateInput: 'DD/MM/YYYY HH:mm'
    },
    display: {
        dateInput: 'DD/MM/YYYY HH:mm',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'DD/MM/YYYY HH:mm',
        monthYearA11yLabel: 'MMMM YYYY'
    }
};

interface DateFormControl {
    date7: FormControl<Date>;
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-time-picker-demo',
    styleUrls: ['./time-picker-demo.component.scss'],
    templateUrl: './time-picker-demo.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        DatePipe,
        FormsModule,
        MatCardModule,
        MatCheckboxModule,
        MatInputModule,
        MatFormFieldModule,
        MatTabsModule,
        MatToolbarModule,
        ReactiveFormsModule,
        NgxTimePickerComponent,
        NgIf
    ],
    providers: [
        { provide: MAT_DATE_FORMATS, useValue: myFormats }
    ]
})
export class TimePickerDemoComponent {
    protected tabIndex = 1;

    protected date0: Date | null = null;
    protected date1 = new Date(2021, 4, 6, 9, 5, 0);
    protected date2 = new Date();
    protected date3 = new Date();
    protected date4 = new Date();
    protected date5 = new Date();
    protected date6 = new Date();
    protected date7 = new Date(2021, 4, 28, 12, 55, 0);
    protected disable6 = true;
    protected dateForm: FormGroup<DateFormControl>;
    protected fakeInput = '';

    public constructor(private changeDetectorRef: ChangeDetectorRef) {
        this.dateForm = new FormGroup<DateFormControl>({
            date7: new FormControl<Date>(this.date7, { nonNullable: true })
        });
    }

    protected matDateChange(event: MatDatepickerInputEvent<Date>): void {
        const date = event.value;
        if (!date || !this.date0) {
            return;
        }
        const clone = new Date(date);
        clone.setHours(this.date0.getHours());
        clone.setMinutes(this.date0.getMinutes());
        this.date0 = clone;
        this.changeDetectorRef.markForCheck();
    }

    protected date0Changed(date: Date): void {
        const clone = date && new Date(date.getTime());
        this.date0 = clone;
        this.changeDetectorRef.markForCheck();
    }

    protected date1Changed(date: Date): void {
        const clone = date && new Date(date.getTime());
        this.date1 = clone;
        this.changeDetectorRef.markForCheck();
    }

    protected date2Changed(date: Date): void {
        const clone = date && new Date(date.getTime());
        this.date2 = clone;
        this.changeDetectorRef.markForCheck();
    }

    protected date3Changed(date: Date): void {
        const clone = date && new Date(date.getTime());
        this.date3 = clone;
        this.changeDetectorRef.markForCheck();
    }

    protected date4Changed(date: Date): void {
        const clone = date && new Date(date.getTime());
        this.date4 = clone;
        this.changeDetectorRef.markForCheck();
    }

    protected date5Changed(date: Date): void {
        const clone = date && new Date(date.getTime());
        this.date5 = clone;
        this.changeDetectorRef.markForCheck();
    }

    protected date6Changed(date: Date): void {
        const clone = date && new Date(date.getTime());
        this.date6 = clone;
        this.changeDetectorRef.markForCheck();
    }
}
