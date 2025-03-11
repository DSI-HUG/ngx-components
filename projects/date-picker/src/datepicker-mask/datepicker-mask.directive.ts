/* eslint-disable @typescript-eslint/naming-convention */
import { Directive, ElementRef, forwardRef, Inject, Input, Optional, Renderer2 } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, NgControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { KeyCodes, NgxDestroy } from '@hug/ngx-core';
import { addDays, addHours, addMinutes, addMonths, addSeconds, addYears, isValid, parse, set } from 'date-fns';
import { isNil } from 'lodash-es';
import { delay, EMPTY, filter, from, fromEvent, map, mergeWith, of, shareReplay, Subject, switchMap, takeUntil, tap, timeInterval } from 'rxjs';

import { NgxDatepickerMaskValidatorService } from './datepicker-mask-validator.service';


@Directive({
    selector: '[matDatepicker][dateFormat],[matDatepicker][dateTimeFormat],[matStartDate][dateFormat],[matEndDate][dateFormat],[matStartDate][dateTimeFormat],[matEndDate][dateTimeFormat]',
    providers: [
        NgxDatepickerMaskValidatorService,
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => NgxDatepickerMaskValidatorService),
            multi: true
        }
    ],
    standalone: true
})
export class NgxDatepickerMaskDirective extends NgxDestroy {
    private applyMask$ = new Subject<void>();

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
        this.applyMask$.next();
    }

    @Input()
    public set placeHolderCharacter(value: string) {
        this._placeHolderCharacter = value || '_';
        this.applyMask$.next();
    }

    private _placeHolderCharacter = '_';
    private _formatExpression?: string;
    private maskValue = '';

    private readonly formatCharRegExp = /[mdyhs]/i;
    private readonly forwardToInputKeyCodes = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'PageDown', 'PageUp', 'End', 'Home', 'Tab'];

    public constructor(
        @Optional() @Inject(MAT_DATE_FORMATS) private readonly dateFormats: MatDateFormats,
        private readonly elementRef: ElementRef<HTMLInputElement>,
        private readonly ngControl: NgControl,
        private readonly renderer: Renderer2,
        // private readonly validator: NgxDatepickerMaskValidatorService,
        private readonly dateAdapter: DateAdapter<unknown>
    ) {
        super();

        elementRef.nativeElement.setAttribute('autocomplete', 'off');

        const focus$ = fromEvent<FocusEvent>(this.elementRef.nativeElement, 'focus').pipe(
            shareReplay(1)
        );

        const selectAll$ = focus$.pipe(
            delay(100),
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
                if (isDatePickerButton) {
                    return;
                }

                if (this.ngControl.control?.value) {
                    this.elementRef.nativeElement.setSelectionRange(0, -1);
                    return;
                }

                this.elementRef.nativeElement.setSelectionRange(0, 0);
            })
        );

        const paste$ = fromEvent<ClipboardEvent>(elementRef.nativeElement, 'paste').pipe(
            tap(event => {
                // Get pasted data via clipboard
                const pastedData = event.clipboardData?.getData('Text');
                if (!pastedData) {
                    return undefined;
                }
                this.parseAndSetValue(pastedData);
                event.preventDefault();
                return false;
            })
        );

        const dblClick$ = fromEvent<Event>(elementRef.nativeElement, 'mousedown').pipe(
            timeInterval(),
            filter(intervalEvent => intervalEvent.interval < 400),
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
            tap(([event, start, end]) => {
                if (start !== undefined && end !== undefined) {
                    this.elementRef.nativeElement.setSelectionRange(start, end);
                }

                event.preventDefault();
                return false;
            })
        );

        const keyDown$ = fromEvent<KeyboardEvent>(elementRef.nativeElement, 'keydown').pipe(
            shareReplay(1)
        );

        const blur$ = fromEvent<FocusEvent>(this.elementRef.nativeElement, 'blur').pipe(
            shareReplay(1)
        );

        const validateOnBlur$ = blur$.pipe(
            tap(() => {
                this.parseAndSetValue(this.elementRef.nativeElement.value);
            })
        );

        const applyMaskOnFocus$ = focus$.pipe(
            filter(() => !this.elementRef.nativeElement.value)
        );

        const maskApplied$ = keyDown$.pipe(
            filter(e => (e.code || e.key) === 'Delete'),
            tap(() => this.setValue(undefined)),
            mergeWith(this.applyMask$, applyMaskOnFocus$),
            filter(() => {
                this.maskValue = this._formatExpression?.replace(/[ymdhs]/gi, this._placeHolderCharacter) || '';

                const modelIsValid = (): boolean => {
                    const value = this.ngControl.value as unknown;
                    if (!value || !(value instanceof Date)) {
                        return false;
                    }
                    return isValid(value);
                };

                return !!this._formatExpression && !!this._placeHolderCharacter && !modelIsValid();
            }),
            tap(() => {
                this.renderer.setProperty(this.elementRef.nativeElement, 'value', this.maskValue);
            })
        );

        const keyApplied$ = keyDown$.pipe(
            switchMap(e => {
                const formatExpression = this._formatExpression;
                if (!this.maskValue || !formatExpression) {
                    return of(undefined);
                }

                const el = e.target as HTMLInputElement;
                const start = el.selectionStart;
                const end = el.selectionEnd;

                if (start === null || end === null) {
                    return of(undefined);
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

                const replaceRange = (value: string, begin: number, to: number, mask: string): string => Array.from(value).map((c, index) => index >= begin && index <= to ? mask[index] : c).join('');
                const replaceAt = (value: string, index: number, char: string): string => value.substring(0, index) + char + value.substring(index + char.length);
                const keyCode = (e.code || e.key) as KeyCodes;

                if ((keyCode === 'ArrowLeft' || keyCode === 'ArrowRight') && !e.altKey && !e.ctrlKey && !e.shiftKey && !e.metaKey) {
                    if (keyCode === 'ArrowLeft') {
                        let newStart = getPosition(start, -1);
                        if (newStart === undefined) {
                            newStart = 1;
                        }
                        newStart -= 1;
                        this.elementRef.nativeElement.setSelectionRange(newStart, newStart);
                    } else {
                        let newStart = getPosition(end + 1, 1);
                        if (newStart === undefined) {
                            newStart = 9999;
                        }
                        this.elementRef.nativeElement.setSelectionRange(newStart, newStart);
                    }
                } else if ((keyCode === 'ArrowUp' || keyCode === 'ArrowDown') && !e.altKey && !e.ctrlKey && !e.shiftKey && !e.metaKey) {
                    if (this.ngControl.value instanceof Date) {
                        const date = this.ngControl.value;
                        const step = keyCode === 'ArrowUp' ? 1 : -1;
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

                } else if (keyCode === 'Backspace') {
                    let value = this.elementRef.nativeElement.value;
                    const char = value.substring(start - 1, end);
                    let newStart = start;
                    let newEnd = end;

                    const selectPreviousChar = (): void => {
                        let previousStart = getPosition(newStart, -1);
                        if (previousStart === undefined) {
                            previousStart = 0;
                        }
                        this.elementRef.nativeElement.setSelectionRange(previousStart, previousStart);
                    };

                    if (this.maskValue && (/[0-9]+/.exec(char) ?? char === this._placeHolderCharacter)) {
                        if (start === end) {
                            newStart -= 1;
                            newEnd = newStart;
                        } else {
                            newEnd -= 1;
                        }

                        value = replaceRange(value, newStart, newEnd, this.maskValue);
                        this.setValue(new Date(NaN));

                        return from(Promise.resolve()).pipe(
                            map(() => {
                                this.renderer.setProperty(this.elementRef.nativeElement, 'value', value);
                                if (newStart === newEnd) {
                                    selectPreviousChar();
                                } else {
                                    this.elementRef.nativeElement.setSelectionRange(newStart, newStart);
                                }
                                e.preventDefault();
                                return false;
                            })
                        );
                    } else {
                        selectPreviousChar();
                    }

                } else if ((keyCode === 'KeyA' && e.ctrlKey) || (keyCode === 'KeyA' && e.metaKey)) { // Ctrl+ A + Cmd + A (Mac)
                    this.elementRef.nativeElement.setSelectionRange(0, -1);

                } else if (/^[0-9]$/.exec(e.key)) {
                    let value = this.elementRef.nativeElement.value;
                    if (end > start) {
                        value = replaceRange(value, start, end, this.maskValue);
                    }

                    const newStart = getPosition(start, 1);
                    if (newStart === undefined) {
                        e.preventDefault();
                        return of(false);
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
                        return from(Promise.resolve()).pipe(
                            map(() => {
                                this.renderer.setProperty(this.elementRef.nativeElement, 'value', value);
                                selectNextChar();
                                e.preventDefault();
                                return false;
                            })
                        );
                    }

                } else if (keyCode === 'KeyD') {
                    const today = set(new Date(), { seconds: 0, milliseconds: 0 });
                    this.setValue(today);
                    this.elementRef.nativeElement.setSelectionRange(0, -1);

                } else if (keyCode === 'Enter') {
                    this.parseAndSetValue(this.elementRef.nativeElement.value);

                } else if (this.forwardToInputKeyCodes.includes(e.key as KeyCodes)) {
                    return of(undefined);

                } else {
                    console.log('DatepickerMaskDirective ignored code', keyCode);
                }

                e.preventDefault();
                return of(false);
            })
        );

        keyApplied$.pipe(
            mergeWith(maskApplied$, paste$, selectAll$, dblClick$, validateOnBlur$),
            takeUntil(this.destroyed$)
        ).subscribe();
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
            updateDateControl(this.ngControl.control, date, this.dateAdapter);
        } else {
            updateDateControl(this.ngControl.control, null, this.dateAdapter);
        }
    }
}
