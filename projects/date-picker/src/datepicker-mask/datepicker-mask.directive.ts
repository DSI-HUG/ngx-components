/* eslint-disable @typescript-eslint/naming-convention */
import { Directive, ElementRef, forwardRef, Inject, Input, OnInit, Optional, Renderer2 } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, NgControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { Destroy, filterMap, KeyCodes, subscribeWith } from '@hug/ngx-core';
import { addDays, addHours, addMinutes, addMonths, addSeconds, addYears, isValid, parse, set } from 'date-fns';
import { isNil } from 'lodash-es';
import { delay, EMPTY, filter, fromEvent, mergeWith, of, startWith, switchMap, takeUntil, tap, timeInterval } from 'rxjs';

import { DatepickerMaskValidatorService } from './datepicker-mask-validator.service';


@Directive({
    selector: '[matDatepicker][dateFormat],[matDatepicker][dateTimeFormat],[matStartDate][dateFormat],[matEndDate][dateFormat],[matStartDate][dateTimeFormat],[matEndDate][dateTimeFormat]',
    providers: [
        DatepickerMaskValidatorService,
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => DatepickerMaskValidatorService),
            multi: true
        }
    ]
})
export class DatepickerMaskDirective extends Destroy implements OnInit {
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('dateTimeFormat')
    public set dateTimeFormat(value: string) {
        this.formatExpression = value || this.dateFormats.display.dateInput as string;
    }

    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('dateFormat')
    public set dateFormat(value: string) {
        this.formatExpression = value || this.dateFormats.display.dateInput as string;
    }

    private set formatExpression(value: string) {
        this._formatExpression = value;
        this.applyMask();
    }

    @Input()
    public set placeHolderCharacter(value: string) {
        this._placeHolderCharacter = value || '_';
        this.applyMask();
    }

    private _placeHolderCharacter = '_';
    private _formatExpression?: string;
    private maskValue = '';

    private formatCharRegExp = /[mdyhs]/i;
    private forwardToInputKeyCodes = ['LeftArrow', 'RightArrow', 'UpArrow', 'DownArrow', 'PageDown', 'PageUp', 'End', 'Home', 'Tab'];

    public constructor(
        @Optional() @Inject(MAT_DATE_FORMATS) private dateFormats: MatDateFormats,
        private elementRef: ElementRef<HTMLInputElement>,
        private ngControl: NgControl,
        private renderer: Renderer2,
        private validator: DatepickerMaskValidatorService,
        private dateAdapter: DateAdapter<unknown>
    ) {
        super();

        elementRef.nativeElement.setAttribute('autocomplete', 'off');

        const dblClick$ = fromEvent<Event>(elementRef.nativeElement, 'mousedown').pipe(
            timeInterval(),
            filter(intervalEvent => intervalEvent.interval < 400)
        );

        const selectAll$ = fromEvent<FocusEvent>(elementRef.nativeElement, 'focus').pipe(
            delay(400),
            mergeWith(fromEvent<KeyboardEvent>(elementRef.nativeElement, 'keydown')),
            timeInterval(),
            tap(intervalEvent => {
                const selectionStart = this.elementRef.nativeElement.selectionStart;
                const selectionEnd = this.elementRef.nativeElement.selectionEnd;
                if (intervalEvent.interval < 400 || intervalEvent.value instanceof KeyboardEvent || !selectionEnd || !selectionStart || selectionEnd > selectionStart) {
                    return;
                }

                const relatedTarget = intervalEvent.value.relatedTarget as HTMLElement;
                const isDatePickerButton = relatedTarget?.classList.contains('date-picker-button');
                if (this.ngControl.control?.value && !isDatePickerButton) {
                    this.elementRef.nativeElement.setSelectionRange(0, -1);
                }
            })
        );

        fromEvent<ClipboardEvent>(elementRef.nativeElement, 'paste').pipe(
            takeUntil(this.destroyed$)
        ).subscribe(event => {
            // Get pasted data via clipboard
            const pastedData = event.clipboardData?.getData('Text');
            if (!pastedData) {
                return undefined;
            }
            this.parseAndSetValue(pastedData);
            event.preventDefault();
            return false;
        });

        dblClick$.pipe(
            switchMap(intervalEvent => {
                // Double click
                if (!this._formatExpression) {
                    return EMPTY;
                }
                const pos = this.elementRef.nativeElement.selectionStart;
                if (pos === null) {
                    return EMPTY;
                }

                let start: number | undefined;
                if (this.formatCharRegExp.exec(this._formatExpression[pos])) {
                    start = pos;
                } else if (this.formatCharRegExp.exec(this._formatExpression[pos - 1])) {
                    start = pos - 1;
                }

                const charAtPos = start !== undefined && this._formatExpression[start];
                if (!start || !charAtPos) {
                    return of([intervalEvent.value, undefined, undefined] as const);
                }

                // Find end
                let end = start + 1;
                // eslint-disable-next-line no-loops/no-loops
                while (this._formatExpression[end] === charAtPos) {
                    end++;
                }

                // Find real start
                // eslint-disable-next-line no-loops/no-loops
                while (this._formatExpression[start - 1] === charAtPos) {
                    start--;
                }

                return of([intervalEvent.value, start, end] as const);
            }),
            delay(1),
            subscribeWith(selectAll$),
            takeUntil(this.destroyed$)
        ).subscribe(([event, start, end]) => {
            if (start !== undefined && end !== undefined) {
                this.elementRef.nativeElement.setSelectionRange(start, end);
            }

            event.preventDefault();
            return false;
        });

        fromEvent<KeyboardEvent>(elementRef.nativeElement, 'keydown').pipe(
            takeUntil(this.destroyed$)
        ).subscribe(e => {
            const formatExpression = this._formatExpression;
            if (!this.maskValue || !formatExpression) {
                return undefined;
            }

            const el = e.target as HTMLInputElement;
            const start = el.selectionStart;
            const end = el.selectionEnd;

            if (start === null || end === null) {
                return undefined;
            }

            const getPosition = (pos: number, direction: -1 | 1): number | undefined => {
                const offset = direction === -1 ? -1 : 0;
                let formatChar = formatExpression[pos + offset];
                // eslint-disable-next-line no-loops/no-loops
                while (formatChar) {
                    if (this.formatCharRegExp.exec(formatChar) ?? formatChar === this._placeHolderCharacter) {
                        break;
                    }
                    pos += direction;
                    formatChar = formatExpression[pos + offset];
                }

                return formatChar ? pos : undefined;
            };

            const replaceRange = (value: string, from: number, to: number, mask: string): string => Array.from(value).map((c, index) => index >= from && index <= to ? mask[index] : c).join('');
            const replaceAt = (value: string, index: number, char: string): string => value.substring(0, index) + char + value.substring(index + char.length);

            if ((e.code === 'UpArrow' || e.code === 'DownArrow') && !e.altKey && !e.ctrlKey && !e.shiftKey && !e.metaKey) {
                if (this.ngControl.value instanceof Date) {
                    const date = this.ngControl.value;
                    const step = e.code === 'UpArrow' ? 1 : -1;
                    let formatChar = formatExpression[start];
                    if (!formatChar || !this.formatCharRegExp.exec(formatChar)) {
                        formatChar = formatExpression[start - 1];
                    }
                    if (this.formatCharRegExp.exec(formatChar)) {
                        let newDate: Date | undefined;
                        switch (formatChar) {
                            case 'y':
                            case 'Y':
                                newDate = addYears(date, step);
                                break;
                            case 'M':
                                newDate = addMonths(date, step);
                                newDate.setFullYear(date.getFullYear());
                                break;
                            case 'd':
                            case 'D':
                                newDate = addDays(date, step);
                                newDate.setMonth(date.getMonth());
                                break;
                            case 'h':
                            case 'H':
                                newDate = addHours(date, step);
                                newDate.setDate(date.getDate());
                                break;
                            case 'm':
                                newDate = addMinutes(date, step);
                                newDate.setHours(date.getHours());
                                break;
                            case 's':
                            case 'S':
                                newDate = addSeconds(date, step);
                                newDate.setMinutes(date.getMinutes());
                                break;
                            default:
                        }

                        this.setValue(newDate);
                        this.elementRef.nativeElement.setSelectionRange(start, start);
                    }
                }

            } else if (e.code === 'Backspace') {
                let value = this.elementRef.nativeElement.value;
                const char = value.substring(start - 1, (end - start) || 1);

                const selectPreviousChar = (): void => {
                    let previousStart = getPosition(start, -1);
                    if (previousStart === undefined) {
                        previousStart = 0;
                    }
                    this.elementRef.nativeElement.setSelectionRange(previousStart, previousStart);
                };

                if (this.maskValue && (/[0-9]+/.exec(char) ?? char === this._placeHolderCharacter)) {
                    let newStart = start;
                    let newEnd = end;
                    if (start === end) {
                        newStart -= 1;
                        newEnd = newStart;
                    } else {
                        newEnd -= 1;
                    }

                    value = replaceRange(value, newStart, newEnd, this.maskValue);
                    this.setValue(new Date(NaN));
                    void Promise.resolve().then(() => {
                        this.renderer.setProperty(this.elementRef.nativeElement, 'value', value);
                        if (newStart === newEnd) {
                            selectPreviousChar();
                        } else {
                            this.elementRef.nativeElement.setSelectionRange(newStart, newStart);
                        }
                    });
                } else {
                    selectPreviousChar();
                }

            } else if (e.code === 'Delete') {
                this.setValue(undefined);
                this.applyMask();

            } else if ((e.code === 'KeyA' && e.ctrlKey) || (e.code === 'KeyA' && e.metaKey)) { // Ctrl+ A + Cmd + A (Mac)
                this.elementRef.nativeElement.setSelectionRange(0, -1);

            } else if (/^[0-9]$/.exec(e.key)) {
                let value = this.elementRef.nativeElement.value;
                if (end > start) {
                    value = replaceRange(value, start, end, this.maskValue);
                }

                const newStart = getPosition(start, 1);
                if (newStart === undefined) {
                    e.preventDefault();
                    return false;
                }

                value = replaceAt(value, newStart, e.key);

                const selectNextChar = (): void => {
                    let nextStart = getPosition(newStart + 1, 1);
                    if (nextStart === undefined) {
                        nextStart = -1;
                    }
                    this.elementRef.nativeElement.setSelectionRange(nextStart, nextStart);
                };

                const newDate = this.parseAndSetValue(value);
                if (isValid(newDate)) {
                    selectNextChar();
                } else {
                    void Promise.resolve().then(() => {
                        this.renderer.setProperty(this.elementRef.nativeElement, 'value', value);
                        selectNextChar();
                    });
                }

            } else if (e.code === 'KeyD') {
                const today = set(new Date(), { seconds: 0, milliseconds: 0 });
                this.setValue(today);
                this.elementRef.nativeElement.setSelectionRange(0, -1);

            } else if (this.forwardToInputKeyCodes.includes(e.key as KeyCodes)) {
                return undefined;

            } else {
                console.log('DatepickerMaskDirective ignored code', e.code);
            }

            e.preventDefault();
            return false;
        });
    }

    public ngOnInit(): void {
        // Assure que le valueChange est toujours enregistré au focus au cas ou la form aurait changé.
        // En cas de réassignation d'une nouvelle form, le valueChange n'est pas renouvelé et l'événement
        // n'est plus jamais levé.
        fromEvent<FocusEvent>(this.elementRef.nativeElement, 'focus').pipe(
            tap(() => {
                if (this.elementRef.nativeElement.value === '') {
                    this.applyMask();
                }
            }),
            startWith(undefined),
            filterMap(() => this.ngControl.valueChanges),
            switchMap(valueChanges$ => valueChanges$.pipe(
                tap(value => {
                    if (value) {
                        this.validator.markAsValid();
                    }
                    this.applyMask();
                })
            )),
            takeUntil(this.destroyed$)
        ).subscribe();
    }

    private modelIsValid(): boolean {
        const value = this.ngControl.value as unknown;
        if (!value || !(value instanceof Date)) {
            return false;
        }

        return isValid(value);
    }

    private applyMask(): void {
        this.maskValue = this._formatExpression?.replace(/[ymdhs]/gi, this._placeHolderCharacter) || '';
        void Promise.resolve().then(() => {
            if (!this._formatExpression || !this._placeHolderCharacter || this.modelIsValid()) {
                return;
            }

            this.renderer.setProperty(this.elementRef.nativeElement, 'value', this.maskValue);
            this.elementRef.nativeElement.setSelectionRange(0, 0);
        });
    }

    private parseAndSetValue(str: string): Date {
        if (!this._formatExpression) {
            return new Date();
        }
        const newDate = parse(str, this._formatExpression, new Date());
        this.setValue(newDate);
        return newDate;
    }

    private setValue(date: Date | undefined): void {
        const updateDateControl = (control: AbstractControl | null, d: unknown, dateAdpater: DateAdapter<unknown>): void => {
            if (!control || !control.value && !d) {
                return;
            }
            if (!dateAdpater.sameDate(control.value, d)) {
                control.setValue(d);
                control.markAsDirty();
            }
        };

        if (isNil(date) || isValid(date)) {
            this.validator.markAsValid();
            updateDateControl(this.ngControl.control, date, this.dateAdapter);
        } else {
            this.validator.markAsInvalid();
            updateDateControl(this.ngControl.control, null, this.dateAdapter);
        }
    }
}
