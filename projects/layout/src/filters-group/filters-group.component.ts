import { CdkConnectedOverlay, CdkOverlayOrigin, type ConnectionPositionPair } from '@angular/cdk/overlay';
import { LowerCasePipe, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, contentChildren, effect, ElementRef, inject, input, output, type Signal, signal, type TemplateRef, viewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconButton } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltip } from '@angular/material/tooltip';

import { NgxLayoutIntl } from '../providers';
import { FILTER_TOKEN } from './filter-chip.model';

const resizeSignal = (
    element: () => ElementRef<HTMLElement> | undefined,
    box: ResizeObserverBoxOptions = 'border-box'
): Signal<ResizeObserverEntry | undefined> => {

    const value = signal<ResizeObserverEntry | undefined>(undefined);

    effect(onCleanup => {
        const el = element()?.nativeElement;
        if (!el) {
            return;
        }

        const initialValue: ResizeObserverEntry = {
            borderBoxSize: [],
            contentRect: new DOMRect(),
            contentBoxSize: [],
            devicePixelContentBoxSize: [],
            target: el
        };

        value.set(initialValue);

        const ro = new ResizeObserver(entries => {
            value.set(entries[0] || initialValue);
        });

        ro.observe(el, { box });
        onCleanup(() => {
            ro.disconnect();
        });
    });

    return value;
};

@Component({
    selector: 'ngx-filters-group',
    templateUrl: './filters-group.component.html',
    styleUrl: './filters-group.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatIcon,
        MatIconButton,
        MatChipsModule,
        MatTooltip,
        NgTemplateOutlet,
        CdkConnectedOverlay,
        CdkOverlayOrigin,
        MatSlideToggleModule,
        FormsModule,
        MatBadgeModule,
        LowerCasePipe
    ]
})
export class NgxFiltersGroupComponent {
    public readonly resetFilters = output();
    public readonly folded = input<boolean>();

    protected readonly intl = inject(NgxLayoutIntl, { optional: true });

    // #region Overlay
    protected readonly overlayOrigin = signal<CdkOverlayOrigin | undefined>(undefined);
    protected readonly overlayContent = signal<TemplateRef<unknown> | undefined>(undefined);
    protected readonly overlayOpen = signal<boolean>(false);
    protected readonly moreFiltersOverlay = signal<boolean>(false);
    protected readonly overlayPositions: ConnectionPositionPair[] = [{
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top',
        offsetY: 16
    }, {
        originX: 'end',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'top',
        offsetY: 16
    }];
    // #endregion

    // #region Filters
    protected allFilters = contentChildren(FILTER_TOKEN);
    protected readonly activeFiltersAmount = computed(() => this.invisibleFilters().filter(filter => filter.active()).length);

    protected readonly visibleFilters = computed(() => {
        const lastFittingIndex = this.lastFittingIndex();
        if (lastFittingIndex < 0) {
            return [];
        }

        return this.allFilters().slice(0, lastFittingIndex);
    });

    protected readonly invisibleFilters = computed(() => {
        const lastFittingIndex = this.lastFittingIndex();
        if (lastFittingIndex < 0) {
            return this.allFilters();
        }

        return this.allFilters().slice(lastFittingIndex);
    });

    private readonly filterContainerRef = viewChild.required<ElementRef<HTMLElement>>('container');
    private readonly filterContainerPadding = computed(() => Number.parseFloat(globalThis.getComputedStyle(this.filterContainerRef().nativeElement).paddingInline));

    // #endregion

    // #region Host
    private readonly hostElement = inject<ElementRef<HTMLElement>>(ElementRef);
    private readonly hostSize = resizeSignal(() => this.hostElement);
    private readonly hostWidth = computed(() => Math.ceil(this.hostSize()?.contentRect.width || 0));
    // #endregion

    // #region MeasureRow
    private readonly measureRowRef = viewChild<ElementRef<HTMLElement>>('measureRow');
    private readonly measureRowSize = resizeSignal(() => this.measureRowRef());
    private readonly measureRowWidth = computed(() => Math.ceil(this.measureRowSize()?.contentRect.width || 0));
    // #endregion

    // #region StaticFields
    private readonly staticFieldsRef = viewChild<ElementRef<HTMLElement>>('static');
    private readonly staticFieldsSize = resizeSignal(() => this.staticFieldsRef());
    private readonly staticFieldsWidth = computed(() => Math.ceil(this.staticFieldsSize()?.contentRect.width || 0));
    // #endregion

    private readonly lastFittingIndex = computed(() => {
        const hostWidth = this.hostWidth();
        if (!hostWidth) {
            return -1;
        }

        const availableSpace = hostWidth - (this.staticFieldsWidth() + (2 * this.filterContainerPadding()));
        const filters = Array.from(this.measureRowRef()?.nativeElement.querySelectorAll<HTMLElement>('mat-chip-option') ?? []);

        if (availableSpace - this.measureRowWidth() >= 0) {
            return filters.length;
        }

        return this.getLastFittingIndex(availableSpace, filters);
    });

    protected emitResetClicked(): void {
        this.resetFilters.emit();
    }

    private getLastFittingIndex(availableSpace: number, elements: readonly HTMLElement[]): number {
        const firstEl = elements[0];

        if (!firstEl || availableSpace <= 0 || availableSpace - firstEl.offsetWidth < 0) {
            return -1;
        }

        let residualAvailableSpace = availableSpace;

        const lastFittingIndex = elements.findIndex(el => {
            residualAvailableSpace -= el.offsetWidth + 16;
            return residualAvailableSpace <= 0;
        });

        return lastFittingIndex >= 0 ? lastFittingIndex : elements.length - 1;
    }
}
