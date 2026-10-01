import { CdkTrapFocus } from '@angular/cdk/a11y';
import { CdkAccordion, CdkAccordionItem } from '@angular/cdk/accordion';
import { CdkConnectedOverlay, CdkOverlayOrigin, type ConnectionPositionPair } from '@angular/cdk/overlay';
import { LowerCasePipe, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, contentChildren, effect, ElementRef, inject, input, output, type Signal, signal, type TemplateRef, viewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatBadge } from '@angular/material/badge';
import { MatIconButton } from '@angular/material/button';
import { MatChip, MatChipAvatar, MatChipOption, MatChipSet, MatChipTrailingIcon } from '@angular/material/chips';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatTooltip } from '@angular/material/tooltip';

import { NgxLayoutIntl } from '../providers';
import { FILTER_TOKEN, NgxComplexFilter, NgxToggleFilter } from './filter-chip.model';

export interface NgxFilterContext {
    $implicit: () => void;
}

interface ComplexFilterView {
    readonly source: NgxComplexFilter;
    readonly type: 'complex';
    readonly active: boolean;
    readonly selectedFilterLabel: string;
    readonly templateRef: TemplateRef<unknown>;
}

interface ToggleFilterView {
    readonly source: NgxToggleFilter;
    readonly type: 'toggle';
    readonly active: boolean;
}

type FilterView = ToggleFilterView | ComplexFilterView;

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
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        MatIcon,
        MatIconButton,
        MatChip,
        MatChipOption,
        MatChipTrailingIcon,
        MatChipSet,
        MatTooltip,
        NgTemplateOutlet,
        CdkConnectedOverlay,
        CdkOverlayOrigin,
        MatSlideToggle,
        FormsModule,
        MatBadge,
        LowerCasePipe,
        MatDivider,
        CdkTrapFocus,
        MatChipAvatar,
        CdkAccordion,
        CdkAccordionItem
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
    protected readonly activeFilters = computed(() => this.allFilters().filter(filter => filter.active()).length);
    protected readonly activeFiltersAmount = computed(() => this.invisibleFilters().filter(filter => filter.active).length);

    protected readonly visibleFilters = computed(() => {
        const lastFittingIndex = this.lastFittingIndex();
        if (lastFittingIndex < 0) {
            return [];
        }
        return this.allFilterViews().slice(0, lastFittingIndex);
    });

    protected readonly invisibleFilters = computed(() => {
        const lastFittingIndex = this.lastFittingIndex();
        if (lastFittingIndex < 0) {
            return this.allFilterViews();
        }
        return this.allFilterViews().slice(lastFittingIndex);
    });

    protected readonly allFilterViews = signal<FilterView[]>([]);
    protected readonly expandedFiltersAmount = signal(0);

    protected readonly filterContext = {
        $implicit: (): void => {
            if (!this.moreFiltersOverlay()) {
                this.overlayOpen.set(false);
            }
        }
    };

    private readonly accordion = viewChild(CdkAccordion);
    private readonly filtersContent = viewChild<ElementRef<HTMLElement>>('filtersContent');

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

    private readonly lastFittingIndex = signal(-1);

    private readonly rawLastFittingIndex = computed(() => {
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

    private readonly liveFilterViews = computed<FilterView[]>(() => this.allFilters().map((f): FilterView =>
        f.type === 'toggle'
            ? { source: f, type: 'toggle', active: f.active() }
            : { source: f, type: 'complex', active: f.active(), selectedFilterLabel: f.selectedFilterLabel(), templateRef: f.templateRef }
    ));

    private constructor() {
        effect(() => {
            const index = this.rawLastFittingIndex();
            const views = this.liveFilterViews();
            if (!this.overlayOpen()) {
                this.lastFittingIndex.set(index);
                this.allFilterViews.set(views);
            }
        });
    }

    protected contextForSection(item: CdkAccordionItem, headline: HTMLElement): NgxFilterContext {
        return {
            $implicit: (): void => {
                item.close();

                requestAnimationFrame(() => {
                    const container = this.filtersContent()?.nativeElement;
                    if (!container) {
                        return;
                    }

                    const top = headline.getBoundingClientRect().top
                    - container.getBoundingClientRect().top
                    + container.scrollTop;

                    container.scrollTo({ top, behavior: 'smooth' });
                });
            }
        };
    }

    protected onFilterOpened(): void {
        this.expandedFiltersAmount.update(amount => amount + 1);
    }

    protected onFilterClosed(): void {
        this.expandedFiltersAmount.update(amount => Math.max(0, amount - 1));
    }

    protected emitResetClicked(): void {
        this.resetFilters.emit();
    }

    protected openOverlay(
        trigger: CdkOverlayOrigin,
        templateRef: TemplateRef<unknown>,
        moreFiltersOverlay: boolean
    ): void {
        const isSameOverlay =
        this.overlayOpen() && this.overlayContent() === templateRef;

        this.overlayOpen.set(false);

        if (isSameOverlay) {
            return;
        }

        this.overlayOrigin.set(trigger);
        this.overlayContent.set(templateRef);
        this.moreFiltersOverlay.set(moreFiltersOverlay);
        this.overlayOpen.set(true);
    }

    protected collapseAllFilters(): void {
        this.accordion()?.closeAll();
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
