/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { AsyncPipe, DatePipe, NgIf, registerLocaleData } from '@angular/common';
import localeFrCh from '@angular/common/locales/fr-CH';
import { ChangeDetectionStrategy, Component, Injectable, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats } from '@angular/material/core';
import { DateRange, MatCalendarCellClassFunction, MatDatepickerModule } from '@angular/material/datepicker';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DateFnsAdapter } from '@angular/material-date-fns-adapter';
import { NgxDestroy, setLocale } from '@hug/ngx-core';
import { NgxDatepickerButtonsComponent, NgxDatepickerMaskDirective, NgxDatepickerWithTimeComponent } from '@hug/ngx-date-picker';
import { addDays, addMonths, endOfMonth, startOfDay, startOfMonth } from 'date-fns';
import { frCH } from 'date-fns/locale';
import { debounceTime, ReplaySubject, takeUntil } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';

registerLocaleData(localeFrCh);
setLocale(frCH);

interface DateFormControls {
    date: FormControl<Date | null>;
}

interface DateRangeFormControls {
    from: FormControl<Date | null>;
    to: FormControl<Date | null>;
}

@Injectable()
class DejaDateAdapter extends DateFnsAdapter {
    public override sameDate(first: Date | null, second: Date | null): boolean {
        return first?.getTime() === second?.getTime();
    }

    public override compareDate(first: Date, second: Date): number {
        return (
            first && second ? first.getTime() - second.getTime() : 0
        );
    }

    public override getFirstDayOfWeek(): number {
        return 1;
    }
}

interface DejaDateFormats extends MatDateFormats {
    parse: {
        dateInput: string;
    };
    display: {
        dateInput: string;
        monthLabel?: string;
        monthYearLabel: string;
        dateA11yLabel: string;
        monthYearA11yLabel: string;
    };
}

const dejaDateTimeFormats: DejaDateFormats = {
    parse: {
        dateInput: 'dd.MM.yyyy HH:mm'
    },
    display: {
        dateInput: 'dd.MM.yyyy HH:mm',
        monthYearLabel: 'MMM yyyy',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM yyyy'
    }
};

@Component({
    selector: 'app-date-picker-demo',
    styleUrls: ['./date-picker-demo.component.scss'],
    templateUrl: './date-picker-demo.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgIf,
        DatePipe,
        AsyncPipe,
        NgxDatepickerButtonsComponent,
        NgxDatepickerMaskDirective,
        NgxDatepickerWithTimeComponent,
        MatButtonModule,
        MatCardModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatTabsModule,
        MatToolbarModule,
        ReactiveFormsModule
    ],
    providers: [
        { provide: DateAdapter, useClass: DejaDateAdapter },
        { provide: LOCALE_ID, useValue: 'fr-CH' },
        { provide: MAT_DATE_FORMATS, useValue: dejaDateTimeFormats },
        { provide: MAT_DATE_LOCALE, useValue: frCH }
    ]
})
export class DatePickerDemoComponent extends NgxDestroy {
    public tabIndex = 1;

    public dateForm: FormGroup<DateFormControls>;
    public dateRangeForm: FormGroup<DateRangeFormControls>;
    public dateTimeForm: FormGroup<DateFormControls>;
    public dateTimeRangeForm: FormGroup<DateRangeFormControls>;

    public time?: Date;
    public timeFrom?: Date;
    public timeTo?: Date;

    /**
     * Deja Mat Datetime range picker (button)
     */
    public selectedRange$ = new ReplaySubject<DateRange<Date>>(1);
    public minDate: Date;
    public maxDate: Date;
    public defaultValues: DateRange<Date>;

    public constructor() {
        super();

        this.dateForm = new FormGroup<DateFormControls>({
            date: new FormControl<Date | null>(null)
        });

        this.dateRangeForm = new FormGroup<DateRangeFormControls>({
            from: new FormControl<Date | null>(null),
            to: new FormControl<Date | null>(null)
        });

        this.dateTimeForm = new FormGroup<DateFormControls>({
            date: new FormControl(new Date())
        });

        this.dateTimeRangeForm = new FormGroup<DateRangeFormControls>({
            from: new FormControl<Date | null>(null),
            to: new FormControl<Date | null>(null)
        });

        this.dateForm.valueChanges.pipe(
            debounceTime(10),
            takeUntil(this.destroyed$)
        ).subscribe(values => {
            console.log('date selected', values.date);
        });

        this.dateRangeForm.valueChanges.pipe(
            debounceTime(10),
            takeUntil(this.destroyed$)
        ).subscribe(values => {
            console.log('date range selected', values.from, 'to', values.to);
        });

        this.dateTimeForm.valueChanges.pipe(
            debounceTime(10),
            takeUntil(this.destroyed$)
        ).subscribe(values => {
            console.log('date time selected', values.date);
        });

        this.dateTimeRangeForm.valueChanges.pipe(
            debounceTime(10),
            takeUntil(this.destroyed$)
        ).subscribe(values => {
            console.log('date time range selected', values.from, 'to', values.to);
        });

        /*
         * Datetime range picker (button mode)
         */
        this.minDate = addMonths(startOfMonth(new Date()), -3);
        this.maxDate = endOfMonth(addMonths(startOfMonth(new Date()), 3));
        this.defaultValues = new DateRange<Date>(
            startOfDay(new Date()),
            addDays(startOfDay(new Date()), 1)
        );
        this.selectedRange$.pipe(
            takeUntil(this.destroyed$)
        ).subscribe(newRange => this.defaultValues = newRange);
    }

    public dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => view === 'month' && cellDate.getDate() === 1 ? 'example-custom-date-class' : '';

    public getError(validationErrors: ValidationErrors | null): string | undefined {
        if (!validationErrors) {
            return undefined;
        } else if (validationErrors['matDatepickerMax']) {
            return 'La date est trop grande';
        } else if (validationErrors['matDatepickerMin']) {
            return 'La date est trop petite';
        } else if (validationErrors['invalidDate']) {
            return 'La date est invalide';
        } else if (validationErrors['required']) {
            return 'La date est manquante';
        } else {
            return 'La date est invalide ou manquante';
        }
    }

    public setDate(): void {
        this.dateTimeForm = new FormGroup<DateFormControls>({
            date: new FormControl<Date | null>(new Date())
        });
    }
}
