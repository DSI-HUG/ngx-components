import { BooleanInput, coerceBooleanProperty, coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, DestroyRef, ElementRef, EventEmitter, HostBinding, inject, Input, Output, QueryList, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, fromEvent, map, mergeWith, of, shareReplay, Subject, switchMap, take, takeUntil, tap } from 'rxjs';

import { NgxSplitAreaDirective } from './split-area.directive';
import { NgxSplitterDirection } from './splitter-direction-type';

interface DraggingEvent {
    event: MouseEvent | TouchEvent;
    index: number;
}

/**
 * Splitter Component for Angular
 *
 * The splitter component allows to split horizontally or vertically, a container in N resizable part.
 */
@Component({
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'ngx-splitter',
    styleUrls: ['./splitter.component.scss'],
    templateUrl: './splitter.component.html',
    standalone: true
})
export class NgxSplitterComponent {
    /**
     * Event triggered when the user start to drag the cursor
     */
    @Output() public readonly dragStart = new EventEmitter(false);

    /**
     * Event triggered during the cursor's drag
     */
    @Output() public readonly dragProgress = new EventEmitter<number>(false);

    /**
     * Event triggered when the user stop to drag the cursor
     */
    @Output() public readonly dragEnd = new EventEmitter(false);

    /**
     * Direction of the split
     * Can be `horizontal` or `vertical`
     */
    @Input()
    public set direction(direction: NgxSplitterDirection) {
        this._direction = direction;
        this.ensureDirections();
    }

    public get direction(): NgxSplitterDirection {
        return this._direction;
    }

    /**
    * Size of the gutter in pixels
    * By default `10px`
    */
    @Input()
    public set gutterSize(gutterSize: NumberInput) {
        this._gutterSize = coerceNumberProperty(gutterSize);
    }

    public get gutterSize(): NumberInput {
        return this._gutterSize;
    }

    @HostBinding('style.flex-direction')
    protected get styleFlexDirection(): string {
        return this.direction === 'horizontal' ? 'row' : 'column';
    }

    @ContentChildren(NgxSplitAreaDirective)
    protected set spliterAreas(spliterAreas: QueryList<NgxSplitAreaDirective>) {
        this.areas = spliterAreas.toArray();
        this.areas.forEach((area, index) => area.order = 2 * index);
        this.ensureDirections();
    }

    @HostBinding('attr.direction')
    private _direction = 'horizontal' as NgxSplitterDirection;

    @HostBinding('attr.disabled')
    private _disabled: boolean | null = null;

    protected startDragging$ = new Subject<DraggingEvent>();

    protected areas = new Array<NgxSplitAreaDirective>() as readonly NgxSplitAreaDirective[];

    private _gutterSize = 10;

    /** Retourne ou definit si le selecteur est desactivé. */
    @Input()
    public set disabled(value: BooleanInput) {
        this._disabled = coerceBooleanProperty(value) || null;
    }

    public get disabled(): BooleanInput {
        return this._disabled;
    }

    private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
    private changeDetectorRef = inject(ChangeDetectorRef);
    private destroyRef = inject(DestroyRef);

    public constructor() {

        this.startDragging$.pipe(
            filter(() => !this.disabled),
            switchMap(draggingEvent => {
                const areaA = this.areas.find(a => a.order === draggingEvent.index - 1);
                const areaB = this.areas.find(a => a.order === draggingEvent.index + 1);
                const mouseEvent = draggingEvent.event as MouseEvent;
                if (!areaA || !areaB) {
                    return of(mouseEvent);
                }

                const startPos = this.direction === 'horizontal' ? mouseEvent.pageX || mouseEvent.screenX : mouseEvent.pageY || mouseEvent.screenY;
                const containerSizeInPixels = this.direction === 'horizontal' ? this.elementRef.nativeElement.offsetWidth : this.elementRef.nativeElement.offsetHeight;
                const startSizeInPixelsA = areaA.sizeinPixels;
                const startSizeInPixelsB = areaB.sizeinPixels;

                this.dragStart.emit();

                const mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove').pipe(
                    shareReplay({ bufferSize: 1, refCount: true })
                );

                const stopDragging$ = mouseMove$.pipe(
                    filter(event => event.buttons !== 1),
                    mergeWith(fromEvent(document, 'mouseup'), fromEvent(document, 'touchend'), fromEvent(document, 'touchcancel')),
                    map(event => {
                        this.dragEnd.emit();
                        return event as MouseEvent;
                    }),
                    shareReplay({ bufferSize: 1, refCount: true })
                );

                const drag$ = mouseMove$.pipe(
                    filter(event => event.buttons === 1),
                    mergeWith(fromEvent<MouseEvent>(document, 'touchmove')),
                    tap(event => {
                        const pos = this.direction === 'horizontal' ? event.pageX || event.screenX : event.pageY || event.screenY;
                        const diffInPixels = startPos - pos;
                        const areaSizeInPixelsA = startSizeInPixelsA - diffInPixels;
                        const areaSizeInPixelsB = startSizeInPixelsB + diffInPixels;
                        const areaSizeInPercentA = areaA.size = Math.min(100, Math.max(0, 100 * areaSizeInPixelsA / containerSizeInPixels));
                        areaB.size = Math.min(100, Math.max(0, 100 * areaSizeInPixelsB / containerSizeInPixels));
                        const percentWithTwoDigits = Math.round(areaSizeInPercentA * 100) / 100;
                        this.dragProgress.emit(percentWithTwoDigits);
                    }),
                    takeUntil(stopDragging$)
                );

                return stopDragging$.pipe(
                    take(1),
                    mergeWith(drag$)
                );
            }),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe(event => {
            if (event.type !== 'mouseup' && event.type !== 'touchend' && event.type !== 'touchcancel') {
                this.elementRef.nativeElement.setAttribute('splitting', 'true');
            } else {
                this.elementRef.nativeElement.removeAttribute('splitting');
            }
            event.preventDefault();
            this.changeDetectorRef.markForCheck();
            return false;
        });
    }

    private ensureDirections(): void {
        this.areas.forEach(area => area.direction = this.direction);
    }
}
