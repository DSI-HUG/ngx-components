import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { DateAdapter } from '@angular/material/core';
import { MatDatepicker, MatDateRangeInput, MatDateRangePicker } from '@angular/material/datepicker';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { set } from 'date-fns';
import { filter, ReplaySubject, switchMap, tap } from 'rxjs';

@Component({
    selector: 'ngx-datepicker-buttons',
    templateUrl: './datepicker-buttons.component.html',
    styleUrls: ['./datepicker-buttons.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        MatIcon,
        MatIconButton,
        MatTooltip
    ]
})
export class NgxDatepickerButtonsComponent implements OnInit {
    @Output() public readonly dateChange = new EventEmitter<Date>();

    @Input() public forInput!: MatFormFieldControl<unknown>;
    @Input() public forPicker!: MatDatepicker<unknown> | MatDateRangePicker<Date>;

    protected changeDetectorRef = inject(ChangeDetectorRef);
    protected dateAdater = inject<DateAdapter<unknown>>(DateAdapter);
    private destroyRef = inject(DestroyRef);

    private _hideToday = false;
    private _hideClear = false;
    private setToday$ = new ReplaySubject<boolean>(1);

    @Input()
    public set setTodayOnOpen(value: BooleanInput) {
        this.setToday$.next(coerceBooleanProperty(value));
    }

    @Input()
    public set hideToday(value: BooleanInput) {
        this._hideToday = coerceBooleanProperty(value);
    }

    public get hideToday(): BooleanInput {
        return this._hideToday;
    }

    @Input()
    public set hideClear(value: BooleanInput) {
        this._hideClear = coerceBooleanProperty(value);
    }

    public get hideClear(): BooleanInput {
        return this._hideClear;
    }

    public ngOnInit(): void {
        this.setToday$.pipe(
            filter(setToday => setToday && !!this.forPicker),
            switchMap(() => this.forPicker.openedStream.pipe(
                tap(() => {
                    if (this.forInput && ((this.forInput instanceof MatDateRangeInput && !this.forInput.getStartValue()) || !this.forInput.value)) {
                        this.forPicker.select(new Date());
                    }
                })
            )),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe();

        if (this.forInput.ngControl?.valueChanges) {
            this.forInput.ngControl.valueChanges.pipe(
                takeUntilDestroyed(this.destroyRef)
            ).subscribe(() => {
                this.changeDetectorRef.markForCheck();
            });
        }
    }

    public setValue(event: Event, today: boolean): boolean {
        const updateDateControl = (control: AbstractControl | undefined, date: unknown, dateAdpater: DateAdapter<unknown>): void => {
            if (!control) {
                return;
            }

            if (!control.value && !date) {
                this.forInput.value = undefined;
                return;
            }

            if (!dateAdpater.sameDate(control.value, date)) {
                control.setValue(date);
                control.markAsDirty();
            }
        };

        const date = today ? set(new Date(), { seconds: 0, milliseconds: 0 }) : undefined;
        if (this.forInput instanceof MatDateRangeInput) {
            updateDateControl(this.forInput._startInput.ngControl.control ?? undefined, date, this.dateAdater);
            updateDateControl(this.forInput._endInput.ngControl.control ?? undefined, date, this.dateAdater);
        } else {
            updateDateControl(this.forInput.ngControl?.control ?? undefined, date, this.dateAdater);
        }
        event.preventDefault();
        this.dateChange.emit(date);
        return false;
    }

    public openCalendar(): void {
        if (this.forPicker) {
            this.forPicker.open();
        }
    }
}
