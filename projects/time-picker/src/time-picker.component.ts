import { BooleanInput, coerceBooleanProperty, coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, FormsModule, NgControl } from '@angular/forms';
import { MatFormFieldAppearance, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxDestroy } from '@hug/ngx-core';
import { NgxNumericStepperComponent } from '@hug/ngx-numeric-stepper';
import { isSameHour, set } from 'date-fns';
import { debounce, distinctUntilChanged, map, Subject, takeUntil, timer } from 'rxjs';

export type NgxTimePickerDisplayMode = 'fullTime' | 'fullTimeWithHoursDisabled' | 'fullTimeWithMinutesDisabled' | 'hoursOnly' | 'minutesOnly';

export type NgxDateOrDuration = Date | Duration;

type DataType = 'date' | 'duration';

type FieldType = 'hours' | 'minutes';

// TODO sdil refactor rxjs flows
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'ngx-time-picker',
    styleUrls: ['./time-picker.component.scss'],
    templateUrl: './time-picker.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        NgxNumericStepperComponent
    ]
})
export class NgxTimePickerComponent extends NgxDestroy implements ControlValueAccessor {
    @ViewChild('hours') public hours?: ElementRef<HTMLInputElement>;
    @ViewChild('minutes') public minutes?: ElementRef<HTMLInputElement>;

    @Output() public readonly timeChange = new EventEmitter<NgxDateOrDuration>();

    /** Display mode for the time-picker */
    @Input() public mode: NgxTimePickerDisplayMode = 'fullTime';

    /** Data type to manage (Date or Duration) */
    @Input() public dataType: DataType = 'date';

    /**
     * Force the hour or minute to be null (only if the other field is disabled)
     *
     * For instance, if set to true and the hours are disabled, the minutes input value will be null
     * This is useful to force the user to provide a value
     */
    @Input() public forceNullValue = false;

    @Input() public appearance: MatFormFieldAppearance = 'outline';

    @Input()
    public set autoFocus(value: BooleanInput) {
        this._autoFocus = coerceBooleanProperty(value);
    }

    @Input() public defaultPlaceholderHours = '_ _';
    @Input() public defaultPlaceholderMinutes = '_ _';

    @Input()
    public set time(value: NgxDateOrDuration | undefined) {
        this.writeValue(value);
    }

    public get time(): NgxDateOrDuration | undefined {
        return this.value;
    }

    /** Step of the arrows */
    @Input()
    public set step(value: NumberInput) {
        this._step = coerceNumberProperty(value);
        this.changeDetectorRef.markForCheck();
    }

    /** To get the step of the minutes arrows */
    public get step(): NumberInput {
        return this._step;
    }

    /** Disabled property setter. Can be string or empty so you can use it like : <time-picker disabled></time-picker> */
    @Input()
    public set disabled(value: BooleanInput) {
        this._disabled = coerceBooleanProperty(value);
        this.changeDetectorRef.markForCheck();
    }

    /** To get disabled attribute. */
    public get disabled(): BooleanInput {
        return this._disabled;
    }

    public onHoursChange$ = new Subject<Event | number>();
    public onMinutesChange$ = new Subject<Event | number>();
    public _step = 1;

    protected changeDetectorRef = inject(ChangeDetectorRef);
    protected control = inject(NgControl, { self: true, optional: true });

    private _disabled = false;
    private _value?: NgxDateOrDuration;
    private _autoFocus = true;

    public constructor() {
        super();

        if (this.control) {
            this.control.valueAccessor = this;
        }

        this.onHoursChange$.pipe(
            debounce(hours => timer(typeof hours === 'object' ? 0 : 10)),
            distinctUntilChanged(),
            map(hours => {
                if (typeof hours === 'object') {
                    const value = (hours.target as HTMLInputElement).value;
                    return [value !== undefined ? parseInt(value, 10) : undefined, true] as const;
                }
                return [!isNaN(hours) ? hours : 0, false] as const;
            }),
            takeUntil(this.destroyed$)
        ).subscribe(([hours, isEvent]) => {
            if (!this.value) {
                this.value = this.dataType === 'date' ? set(new Date(), { hours, minutes: 0, seconds: 0, milliseconds: 0 }) : { hours, minutes: 0 } as Duration;
            } else if (this.value instanceof Date) {
                const value = this.value?.getTime();
                const clone = new Date(value);
                if (hours !== undefined) {
                    clone.setHours(hours);
                }
                this.value = clone;
            } else {
                this.value = {
                    hours: hours && hours < 0 ? 0 : hours,
                    minutes: this.value.minutes
                };
            }
            this.changeDetectorRef.markForCheck();

            if (isEvent && this._autoFocus && this.minutes) {
                this.minutes.nativeElement.focus({
                    preventScroll: true
                });
                this.minutes.nativeElement.select();
            }
        });

        this.onMinutesChange$.pipe(
            debounce(minutes => timer(typeof minutes === 'object' ? 0 : 10)),
            distinctUntilChanged(),
            map(event => {
                let minutes: number | undefined;
                if (typeof event === 'object') {
                    const value = (event.target as HTMLInputElement).value;
                    minutes = value !== undefined ? parseInt(value, 10) : undefined;
                } else {
                    minutes = event;
                }
                return minutes && !isNaN(minutes) && minutes || 0;
            }),
            takeUntil(this.destroyed$)
        ).subscribe(minutes => {
            if (!this.value) {
                this.value = this.dataType === 'date' ? set(new Date(), { hours: 0, minutes, seconds: 0, milliseconds: 0 }) : { hours: 0, minutes } as Duration;
            } else if (this.value instanceof Date) {
                const newValue = new Date(this.value.getTime());
                if (minutes < 0) {
                    minutes += 60;
                } else if (minutes >= 60) {
                    minutes -= 60;
                }
                newValue.setMinutes(minutes);

                if (this.mode !== 'fullTimeWithHoursDisabled' || (this.mode === 'fullTimeWithHoursDisabled' && isSameHour(this.value, newValue))) {
                    this.value = newValue;
                }
            } else {
                this.value = {
                    hours: this.value.hours,
                    minutes: minutes < 0 || minutes >= 60 ? 0 : minutes
                };
            }
            this.changeDetectorRef.markForCheck();
        });
    }

    public onKeyDown($event: KeyboardEvent, mode: 'hours' | 'minutes'): void {
        // Get input element
        const inputElement = mode === 'hours' ? this.hours?.nativeElement : this.minutes?.nativeElement;
        if ($event.key?.toLowerCase() === 'd') {
            $event.stopPropagation();
            $event.preventDefault();
            this.value = new Date();
        } else if (inputElement) {
            if ($event.key?.toLowerCase() === 'a' && $event.ctrlKey) {
                inputElement.select();
            } else if ($event.key && !['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Backspace', 'Delete', 'Tab', 'Enter', 'Control', 'Shift'].includes($event.key)) {
                // Set regex for input format validation (differs if we are dealing with a date or a duration)
                let regex;
                if (mode === 'hours') {
                    regex = this.dataType === 'date' ? /^(\d|[01]\d|2[0-3])$/ : /^(\d+)$/;
                } else {
                    regex = /^(\d|[0-5]\d)$/;
                }

                // Get the selection in input element
                const [selectionStart, selectionEnd] = [inputElement.selectionStart || 0, inputElement.selectionEnd || 0].sort((a, b) => a - b);
                const selectionDiff = selectionEnd - selectionStart;

                // Get the current value in input element and update it with the new touched key
                const inputValue = inputElement.value || '';
                const inputValueArr = Array.from(inputValue);
                inputValueArr.splice(selectionStart, selectionDiff, $event.key);
                const newInputValue = inputValueArr.join('');

                // Prevent event if the time is not valid
                if (!regex.test(newInputValue)) {
                    $event.stopPropagation();
                    $event.preventDefault();
                } else if (this._autoFocus && mode === 'hours' && ((this.dataType === 'date' && parseFloat(newInputValue) >= 3) || newInputValue.length === 2)) {
                    this.onHoursChange$.next($event);
                }
            }
        }
    }

    public get hoursValue(): number | undefined {
        if (!this.value || (this.forceNullValue && this.mode === 'fullTimeWithMinutesDisabled' && !!this.control?.pristine)) {
            return undefined;
        }
        return this.value instanceof Date ? this.value.getHours() : this.value.hours;
    }

    public get minutesValue(): number | undefined {
        if (!this.value || (this.forceNullValue && this.mode === 'fullTimeWithHoursDisabled' && !!this.control?.pristine)) {
            return undefined;
        }
        return this.value instanceof Date ? this.value.getMinutes() : this.value.minutes;
    }

    public incrementValue(fieldType: FieldType): void {
        if (fieldType === 'hours') {
            this.onHoursChange$.next((this.hoursValue || 0) + 1);
        } else {
            this.onMinutesChange$.next((this.minutesValue || 0) + this._step);
        }
    }

    public decrementValue(fieldType: FieldType): void {
        if (fieldType === 'hours') {
            this.onHoursChange$.next((this.hoursValue || 0) - 1);
        } else {
            this.onMinutesChange$.next((this.minutesValue || 0) - this._step);
        }
    }

    public onClick(mode: 'hours' | 'minutes'): void {
        if (this._autoFocus) {
            if (mode === 'hours') {
                this.hours?.nativeElement.select();
            } else {
                this.minutes?.nativeElement.select();
            }
        }
    }

    // ************* ControlValueAccessor Implementation **************
    /** set accessor including call the onchange callback */
    public set value(v: NgxDateOrDuration | undefined) {
        if (v !== this._value) {
            this.writeValue(v);
            this.onChangeCallback(v);
            this.timeChange.emit(v);
        }
    }

    /** get accessor */
    public get value(): NgxDateOrDuration | undefined {
        return this._value;
    }

    /** From ControlValueAccessor interface */
    public writeValue(value: NgxDateOrDuration | undefined): void {
        if ((value ?? null) !== (this._value ?? null)) {
            if (value instanceof Date) {
                this._value = value ? new Date(value.getTime()) : set(new Date(), { hours: 0, minutes: 0, seconds: 0 });
            } else {
                this._value = value;
            }

            this.changeDetectorRef.markForCheck();
        }
    }

    /** From ControlValueAccessor interface */
    public registerOnChange(fn: (_a: unknown) => void): void {
        this.onChangeCallback = fn;
    }

    /** From ControlValueAccessor interface */
    public registerOnTouched(fn: () => void): void {
        this.onTouchedCallback = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
    // ************* End of ControlValueAccessor Implementation **************

    protected onChangeCallback = (_a: unknown): void => undefined;
    protected onTouchedCallback = (): void => undefined;
}
