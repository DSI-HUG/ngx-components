import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, ElementRef, EventEmitter, HostBinding, inject, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { filterMap, KeyCodes } from '@hug/ngx-core';
import { combineLatestWith, debounceTime, delay, filter, fromEvent, map, mergeWith, ReplaySubject, shareReplay, startWith, Subject, switchMap, tap, timer, withLatestFrom } from 'rxjs';

export type NgxNumericStepperLayout = 'vertical' | 'horizontal' | 'horizontal-inlay';

// TODO sdil refactor rxjs flows
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'ngx-numeric-stepper',
    styleUrls: ['./numeric-stepper.component.scss'],
    templateUrl: './numeric-stepper.component.html',
    standalone: true,
    imports: [
        MatIcon
    ],
    encapsulation: ViewEncapsulation.None
})
export class NgxNumericStepperComponent implements OnInit {
    private static TYPE_ERROR = 'Input element on the same mat-form-field must be type="number". With other input type, use increment or decrement events and implement your proper functions to change the value.';
    private static STEP_FN_ERROR = 'Input element on the same mat-form-field must implement stepDown/stepUp functions.';
    private static INPUT_ERROR = 'To use the automatic binding, you must specify the input field with a matInput reference. [input]="matInputRef"';

    @HostBinding('attr.layout') @Input()
    public layout: NgxNumericStepperLayout = 'vertical';

    @Output() public readonly increment = new EventEmitter<void>();
    @Output() public readonly decrement = new EventEmitter<void>();

    @Input() public input?: MatFormFieldControl<unknown>;

    @Input()
    public set arrowIcons(value: BooleanInput) {
        this._arrowIcons = coerceBooleanProperty(value);
    }

    public get arrowIcons(): BooleanInput {
        return this._arrowIcons;
    }

    @Input()
    public set showOnInit(value: BooleanInput) {
        this._showOnInit = coerceBooleanProperty(value);
    }

    public get showOnInit(): BooleanInput {
        return this._showOnInit;
    }

    @HostBinding('attr.hover')
    protected hover = null as boolean | null;

    public leftUp?: number = undefined;
    public leftDown?: number = undefined;
    public topUp?: number = undefined;
    public topDown?: number = undefined;
    public leftShadow?: number = undefined;
    public topShadow?: number = undefined;
    public widthShadow?: number = undefined;
    public heightShadow?: number = undefined;

    public disableUp = false;
    public disableDown = false;
    public clickArrow$ = new Subject<boolean>();
    public show$ = new ReplaySubject<void>(1);

    protected elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
    protected changeDetectorRef = inject(ChangeDetectorRef);
    private destroyRef = inject(DestroyRef);

    private validateArrows$ = new Subject<void>();
    private _arrowIcons = false;
    private _showOnInit = false;
    private arrowSize = 32;
    private parentAppearance?: string;

    public ngOnInit(): void {
        const calcPositions = (inputElement: HTMLInputElement | undefined, formFieldElement: HTMLElement | undefined, containerElement: HTMLElement | undefined): void => {
            const containerBounds = containerElement?.getBoundingClientRect();
            const formFieldBounds = formFieldElement?.getBoundingClientRect() ?? {} as DOMRect;
            const inputBounds = inputElement?.getBoundingClientRect() ?? formFieldBounds;

            const bounds = this.elementRef.nativeElement.getBoundingClientRect();

            this.validateArrows$.next();

            // Ensure delayed hover in case of the mouse leave accidentally
            formFieldElement?.setAttribute('hover', '');

            if (this.layout === 'horizontal') {
                const height = containerBounds?.height || formFieldBounds.height;
                this.heightShadow = Math.min(54, height) + 2;
                this.topShadow = (containerBounds?.top ?? inputBounds.top + (inputBounds.height - this.heightShadow) / 2 - 5) - bounds.top;
                this.leftDown = this.leftShadow = formFieldBounds.left - bounds.left - 28;
                this.leftUp = formFieldBounds.right - bounds.left;
                this.widthShadow = this.leftUp - this.leftDown + 28;

                if (this.parentAppearance === 'FILL') {
                    this.heightShadow -= 2;
                }

                this.topUp = this.topDown = inputBounds.top + (inputBounds.height - this.arrowSize) / 2 - bounds.top;

            } else if (this.layout === 'horizontal-inlay') {
                this.heightShadow = Math.min(54, containerBounds?.height || formFieldBounds.height) + 4;
                this.topShadow = containerBounds?.top ?? (inputBounds.top + (inputBounds.height - this.heightShadow) / 2 - 5) - bounds.top;
                this.leftDown = this.leftShadow = formFieldBounds.left - bounds.left;
                this.leftUp = formFieldBounds.right - bounds.left - 28;
                this.widthShadow = this.leftUp - this.leftDown + 28;

                if (this.parentAppearance === 'FILL') {
                    this.heightShadow -= 2;
                }

                this.topUp = this.topDown = inputBounds.top + (inputBounds.height - this.arrowSize) / 2 - bounds.top;

            } else {
                this.heightShadow = 90;
                this.topShadow = inputBounds.top - bounds.top + (inputBounds.height - this.heightShadow) / 2;
                this.leftShadow = (containerBounds?.left ?? formFieldBounds.left) - bounds.left;
                this.topUp = this.topShadow;
                this.topDown = this.topShadow + this.heightShadow - this.arrowSize;
                this.widthShadow = containerBounds?.width || formFieldBounds.width;
                this.leftUp = this.leftDown = formFieldBounds.left + (formFieldBounds.width - this.arrowSize) / 2 - bounds.left;
            }

            this.changeDetectorRef.markForCheck();
        };

        const linkedElements$ = timer(100).pipe(
            map(() => {
                // Find form field
                let parentElement = this.elementRef.nativeElement.parentElement;
                let formFieldElement: HTMLElement | undefined;
                let containerElement: HTMLElement | undefined;
                let inputElement: HTMLInputElement | undefined;

                // eslint-disable-next-line no-loops/no-loops
                while (parentElement) {
                    if (parentElement.tagName === 'MAT-FORM-FIELD' || parentElement.hasAttribute('ngx-numeric-stepper-form-field')) {
                        formFieldElement = parentElement;
                    }
                    if (parentElement.hasAttribute('ngx-numeric-stepper-container')) {
                        containerElement = parentElement;
                    }
                    if (containerElement && formFieldElement) {
                        break;
                    }
                    parentElement = parentElement.parentElement;
                }

                if (formFieldElement) {
                    formFieldElement.setAttribute('ngx-numeric-stepper-form-field', this.layout);
                    this.parentAppearance = formFieldElement.getAttribute('appearance')?.toUpperCase();
                }

                if (!formFieldElement) {
                    console.error('ngx-numeric-stepper work only inside a mat-form-field or a [ngx-numeric-stepper-form-field] element');
                } else {
                    inputElement = formFieldElement.getElementsByTagName('INPUT')?.[0] as HTMLInputElement || null;

                    if (!inputElement) {
                        console.error('ngx-numeric-stepper work only inside a mat-form-field or a [ngx-numeric-stepper-form-field] element containing an input element');
                    }
                }

                return [inputElement, formFieldElement, containerElement] as const;
            }),
            filter(([inputElement, formFieldElement]) => !!formFieldElement && !!inputElement),
            shareReplay({ bufferSize: 1, refCount: false })
        );

        const step = (inputElement: HTMLInputElement, event: 'increment' | 'decrement', fn: 'stepUp' | 'stepDown'): void => {
            if (this[event].observed) {
                this[event].emit();
            } else {
                if (inputElement?.type !== 'number') {
                    throw new Error(NgxNumericStepperComponent.TYPE_ERROR);
                }

                if (!inputElement[fn]) {
                    throw new Error(NgxNumericStepperComponent.STEP_FN_ERROR);
                }

                if (!this.input?.ngControl?.control) {
                    throw new Error(NgxNumericStepperComponent.INPUT_ERROR);
                }

                inputElement[fn]();
                this.input.ngControl.control.setValue(+inputElement.value);
            }
            this.validateArrows$.next();
        };

        const step$ = this.clickArrow$.pipe(
            debounceTime(10),
            withLatestFrom(linkedElements$),
            tap(([isUp, [inputElement]]) => {
                if (isUp && !this.disableUp && inputElement) {
                    step(inputElement, 'increment', 'stepUp');
                }
                if (!isUp && !this.disableDown && inputElement) {
                    step(inputElement, 'decrement', 'stepDown');
                }
            }),
            shareReplay({ bufferSize: 1, refCount: false })
        );

        const valueChange$ = linkedElements$.pipe(
            filterMap(([inputElement]) => inputElement),
            switchMap(inputElement => fromEvent<void>(inputElement, 'input').pipe(
                mergeWith(step$, fromEvent<void>(inputElement, 'paste'), fromEvent<void>(inputElement, 'keypress'))
            )),
            debounceTime(50),
            startWith(undefined)
        );

        linkedElements$.pipe(
            switchMap(([inputElement, formFieldElement, containerElement]) => {
                const element = containerElement ?? formFieldElement;
                if (!element) {
                    return [];
                }

                return fromEvent<MouseEvent>(element, 'mouseenter').pipe(
                    switchMap(() => valueChange$),
                    mergeWith(this.show$.pipe(
                        delay(200)
                    )),
                    tap(() => calcPositions(inputElement, formFieldElement, containerElement)),
                    switchMap(() => fromEvent<MouseEvent>(element, 'mouseleave')),
                    delay(400),
                    tap(() => {
                        formFieldElement?.removeAttribute('hover');
                    })
                );
            }),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe();

        linkedElements$.pipe(
            filterMap(([_, formFieldElement]) => formFieldElement),
            switchMap(formFieldElement => fromEvent<KeyboardEvent>(formFieldElement, 'keydown')),
            filter(event => {
                const keyCode = event.code as KeyCodes;
                if (keyCode === 'ArrowUp' || keyCode === 'ArrowDown') {
                    this.clickArrow$.next(keyCode === 'ArrowUp');
                    return true;
                }
                return false;
            }),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe(event => {
            event.preventDefault();
            return false;
        });

        linkedElements$.pipe(
            combineLatestWith(this.validateArrows$),
            filterMap(([[inputElement]]) => inputElement),
            debounceTime(1),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe(inputElement => {
            if (inputElement.disabled) {
                this.disableDown = true;
                this.disableUp = true;
            } else {
                const min = inputElement.min;
                this.disableDown = min !== '' && !isNaN(+min) && +inputElement.value <= +min;

                const max = inputElement.max;
                this.disableUp = max !== '' && !isNaN(+max) && +inputElement.value >= +max;
            }

            this.changeDetectorRef.markForCheck();
        });

        step$.pipe(
            takeUntilDestroyed(this.destroyRef)
        ).subscribe();

        if (this.showOnInit) {
            this.show$.next();
        }
    }
}
