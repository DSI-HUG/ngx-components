import { BooleanInput, coerceBooleanProperty, coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { NgFor, NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, HostBinding, inject, Input, Output, QueryList, ViewEncapsulation } from '@angular/core';
import { NgxDestroy } from '@hug/ngx-core';
import { filter, fromEvent, map, mergeWith, of, shareReplay, Subject, switchMap, take, takeUntil, tap } from 'rxjs';

import { SplitAreaDirective } from './split-area.directive';
import { SplitterDirection } from './splitter-direction-type';

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
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    selector: 'ngx-splitter',
    styleUrls: ['./splitter.component.scss'],
    templateUrl: './splitter.component.html',
    standalone: true,
    imports: [
        NgIf,
        NgFor,
        NgForOf
    ]
})
export class SplitterComponent extends NgxDestroy {
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
    public set direction(direction: SplitterDirection) {
        this._direction = direction;
        this.ensureDirections();
    }

    public get direction(): SplitterDirection {
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

    @ContentChildren(SplitAreaDirective)
    protected set spliterAreas(spliterAreas: QueryList<SplitAreaDirective>) {
        this.areas = spliterAreas.toArray();
        this.areas.forEach((area, index) => area.order = 2 * index);
        this.ensureDirections();
    }

    @HostBinding('attr.direction')
    private _direction = 'horizontal' as SplitterDirection;

    @HostBinding('attr.disabled')
    private _disabled: boolean | null = null;

    protected startDragging$ = new Subject<DraggingEvent>();

    protected areas = new Array<SplitAreaDirective>() as readonly SplitAreaDirective[];

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

    public constructor() {
        super();

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
            takeUntil(this.destroyed$)
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
