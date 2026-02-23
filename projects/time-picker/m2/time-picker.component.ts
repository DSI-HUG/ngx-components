import { BooleanInput, coerceBooleanProperty, coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, FormsModule, NgControl } from '@angular/forms';
import { MatFormFieldAppearance, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxNumericStepperComponent } from '@hug/ngx-numeric-stepper/m2';
import { set } from 'date-fns';
import { debounceTime, distinctUntilChanged, EMPTY, map, mergeWith, Subject, switchMap, tap, timer } from 'rxjs';

export type NgxTimePickerDisplayMode = 'fullTime' | 'fullTimeWithHoursDisabled' | 'fullTimeWithMinutesDisabled' | 'hoursOnly' | 'minutesOnly';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'ngx-time-picker',
    styleUrls: ['./time-picker.component.scss'],
    templateUrl: './time-picker.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        DecimalPipe,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        NgxNumericStepperComponent
    ]
})
export class NgxTimePickerComponent implements ControlValueAccessor {
    @ViewChild('hours') public hours?: ElementRef<HTMLInputElement>;
    @ViewChild('minutes') public minutes?: ElementRef<HTMLInputElement>;

    @Output() public readonly timeChange = new EventEmitter<Date>();

    /** Display mode for the time-picker */
    @Input() public mode: NgxTimePickerDisplayMode = 'fullTime';

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
    public set time(value: Date | undefined) {
        this.writeValue(value);
    }

    public get time(): Date | undefined {
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

    public readonly hoursChange$ = new Subject<Event | number>();
    public readonly minutesChange$ = new Subject<Event | number>();
    public readonly hoursKeyDown$ = new Subject<KeyboardEvent>();

    protected changeDetectorRef = inject(ChangeDetectorRef);
    protected control = inject(NgControl, { optional: true, self: true });
    protected _step = 1;

    private _disabled = false;
    private _value?: Date;
    private _autoFocus = true;

    public constructor() {
        if (this.control) {
            this.control.valueAccessor = this;
        }

        const hoursChange$ = this.hoursChange$.pipe(
            distinctUntilChanged(),
            map(hours => {
                if (typeof hours === 'object') {
                    const value = (hours.target as HTMLInputElement).value;
                    return [value !== undefined ? parseInt(value, 10) : undefined, true] as const;
                }
                return [!isNaN(hours) ? hours : 0, false] as const;
            }),
            tap(([hours, _isEvent]) => {
                const newValue = this.value ? new Date(this.value.getTime()) : new Date();

                if (hours !== undefined) {
                    newValue.setHours(hours);
                }

                if (this.mode === 'fullTime' || this.mode === 'fullTimeWithMinutesDisabled' || this.mode === 'hoursOnly') {
                    this.value = newValue;
                }

                this.changeDetectorRef.markForCheck();
            })
        );

        const minutesChange$ = this.minutesChange$.pipe(
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
            tap(minutes => {
                const newValue = this.value ? new Date(this.value.getTime()) : new Date();

                if (minutes < 0) {
                    minutes += 60;
                } else if (minutes >= 60) {
                    minutes -= 60;
                }
                newValue.setMinutes(minutes);

                if (this.mode === 'fullTime' || this.mode === 'fullTimeWithHoursDisabled' || this.mode === 'minutesOnly') {
                    this.value = newValue;
                }

                this.changeDetectorRef.markForCheck();
            })
        );

        const setFocusToNextInput$ = this.hoursKeyDown$.pipe(
            debounceTime(200),
            switchMap(event => {
                const inputElement = this.hours?.nativeElement;
                if (!inputElement) {
                    return EMPTY;
                }

                if (event.key && !event.ctrlKey && !event.shiftKey && !event.altKey && !['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Backspace', 'Delete', 'Tab', 'Enter', 'Control', 'Shift'].includes(event.key)) {
                    const regex = /^(\d|[01]\d|2[0-3])$/;
                    const [selectionStart, selectionEnd] = [inputElement.selectionStart || 0, inputElement.selectionEnd || 0].sort((a, b) => a - b);
                    const inputValue = inputElement.value || '';
                    if (regex.test(inputValue) && this._autoFocus && inputValue.length === 2 && this.minutes?.nativeElement && inputElement === document.activeElement && selectionStart === 2 && selectionEnd === 2) {
                        this.minutes.nativeElement.focus();
                        return timer(0).pipe(
                            tap(() => {
                                this.minutes?.nativeElement.select();
                            })
                        );
                    }
                }

                return EMPTY;
            })
        );

        hoursChange$.pipe(
            mergeWith(minutesChange$, setFocusToNextInput$),
            takeUntilDestroyed()
        ).subscribe();
    }

    // ************* ControlValueAccessor Implementation **************
    /** set accessor including call the onchange callback */
    public set value(v: Date | undefined) {
        if (v !== this._value) {
            this.writeValue(v);
            this.onChangeCallback(v);
            this.timeChange.emit(v);
        }
    }

    /** get accessor */
    public get value(): Date | undefined {
        return this._value;
    }

    /** From ControlValueAccessor interface */
    public writeValue(value: Date | undefined): void {
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

    protected get hoursValue(): number | undefined {
        if (!this.value || (this.forceNullValue && this.mode === 'fullTimeWithMinutesDisabled' && !!this.control?.pristine)) {
            return undefined;
        }
        return this.value.getHours();
    }

    protected get minutesValue(): number | undefined {
        if (!this.value || (this.forceNullValue && this.mode === 'fullTimeWithHoursDisabled' && !!this.control?.pristine)) {
            return undefined;
        }
        return this.value.getMinutes();
    }

    protected onChangeCallback = (_a: unknown): void => undefined;
    protected onTouchedCallback = (): void => undefined;
}
