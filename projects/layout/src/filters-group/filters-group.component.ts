import { CdkTrapFocus } from '@angular/cdk/a11y';
import { CdkAccordion, CdkAccordionItem } from '@angular/cdk/accordion';
import { CdkConnectedOverlay, CdkOverlayOrigin, type ConnectionPositionPair } from '@angular/cdk/overlay';
import { LowerCasePipe, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, contentChildren, effect, ElementRef, inject, input, linkedSignal, output, type Signal, signal, type TemplateRef, viewChild, viewChildren, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatBadge } from '@angular/material/badge';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatChip, MatChipAvatar, MatChipListbox, MatChipOption, MatChipTrailingIcon } from '@angular/material/chips';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatTooltip } from '@angular/material/tooltip';

import { NgxLayoutIntl } from '../providers';
import { NgxExpandedDirective } from './expanded-filter.directive';
import { FILTER_TOKEN, NgxComplexFilter, NgxToggleFilter } from './filter-chip.model';

export interface NgxFilterContext {
    $implicit: () => void;
}

interface ComplexFilterView {
    readonly source: NgxComplexFilter;
    readonly type: 'complex';
    readonly active: boolean;
    readonly selectedFilterLabel: string | undefined;
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
        MatChipListbox,
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
        CdkAccordionItem,
        MatButton,
        NgxExpandedDirective,
        MatTooltip,
        MatProgressSpinner
    ]
})
export class NgxFiltersGroupComponent {
    public readonly resetRequested = output();
    public readonly canceled = output();
    public readonly applied = output();
    public readonly folded = input<boolean>(false);

    protected readonly intl = inject(NgxLayoutIntl, { optional: true });

    // #region Overlay
    protected readonly overlayOrigin = signal<CdkOverlayOrigin | undefined>(undefined);
    protected readonly overlayContent = signal<TemplateRef<unknown> | undefined>(undefined);
    protected readonly overlayOpen = signal<boolean>(false);
    protected readonly requireExplicitApply = signal<boolean>(false);
    protected readonly moreFiltersOverlay = signal<boolean>(false);
    protected readonly validating = signal<boolean>(false);

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

    protected readonly hasOverflow = computed(() => {
        this.oneFilterContentSize();

        const element = this.oneFilterContent()?.nativeElement;
        return !!element && element.scrollHeight > element.clientHeight;
    });
    // #endregion

    // #region Filters
    protected allFilters = contentChildren(FILTER_TOKEN);
    protected readonly activeFilters = computed(() => this.allFilters().filter(filter => filter.active()).length);
    protected readonly activeFiltersAmount = computed(() => this.invisibleFilters().filter(filter => filter.active).length);

    protected readonly visibleFilters = computed(() => {
        const visibleFiltersEndIndex = this.visibleFiltersEndIndex();
        if (visibleFiltersEndIndex < 0) {
            return [];
        }
        return this.allFilterViews().slice(0, visibleFiltersEndIndex);
    });

    protected readonly invisibleFilters = computed(() => {
        const visibleFiltersEndIndex = this.visibleFiltersEndIndex();
        if (visibleFiltersEndIndex < 0) {
            return this.allFilterViews();
        }
        return this.allFilterViews().slice(visibleFiltersEndIndex);
    });

    protected readonly allFilterViews = linkedSignal<FilterView[] | undefined, FilterView[]>({
        source: () => {
            if (this.overlayOpen()) {
                return undefined;
            }
            if (this.requireExplicitApply()) {
                return undefined;
            }

            return this.liveFilterViews();
        },
        computation: (filters, previous) => filters ?? previous?.value ?? []
    });

    protected readonly expandedFilters = viewChildren(NgxExpandedDirective);
    protected readonly hasExpandedFilters = computed(() => this.expandedFilters().some(filter => filter.ngxExpandedFilter()));

    protected readonly filterContext = {
        $implicit: (): void => {
            if (!this.moreFiltersOverlay()) {
                this.requireExplicitApply.set(false);
                this.overlayOpen.set(false);
            }
        }
    };

    protected readonly currentFilter = computed(() => {
        if (this.moreFiltersOverlay()) {
            return undefined;
        }

        return this.allFilters().find(filter => {
            if (filter.type !== 'complex') {
                return undefined;
            }
            return filter.templateRef === this.overlayContent();
        }) as NgxComplexFilter | undefined;
    });

    protected readonly disableApply = computed(() => this.currentFilter()?.applyDisabled() ?? false);

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

    private readonly visibleFiltersEndIndex = linkedSignal<number | undefined, number>({
        source: () => this.overlayOpen() ? undefined : this.measuredVisibleFiltersEndIndex(),
        computation: (index, previous) => index ?? previous?.value ?? -1
    });

    private readonly measuredVisibleFiltersEndIndex = computed(() => {
        const hostWidth = this.hostWidth();
        if (!hostWidth) {
            return -1;
        }

        const availableSpace = hostWidth - (this.staticFieldsWidth() + (2 * this.filterContainerPadding()));
        const filters = Array.from(this.measureRowRef()?.nativeElement.querySelectorAll<HTMLElement>('mat-chip-option') ?? []);

        if (availableSpace - this.measureRowWidth() >= 0) {
            return filters.length;
        }

        return this.getVisibleFiltersEndIndex(availableSpace, filters);
    });

    private readonly liveFilterViews = computed<FilterView[]>(() => this.allFilters().map((f): FilterView => {
        if (f.type === 'toggle') {
            return { source: f, type: 'toggle', active: f.active() };
        }
        return { source: f, type: 'complex', active: f.active(), selectedFilterLabel: f.selectedFilterLabel(), templateRef: f.templateRef };
    }));

    private readonly oneFilterContent = viewChild<ElementRef<HTMLElement>>('oneFilterContent');
    private readonly oneFilterContentSize = resizeSignal(() => this.oneFilterContent());

    protected emitCanceled(): void {
        this.canceled.emit();
        this.overlayOpen.set(false);
    }

    protected async emitAppliedFilters(): Promise<void> {
        let valid = true;
        this.validating.set(true);

        if (this.currentFilter()) {
            const currentFilter = this.currentFilter();
            const validationBeforeApply = currentFilter?.validationBeforeApply();
            valid = validationBeforeApply ? await validationBeforeApply() : true;
        } else {
            this.collapseAllFilters();
            const filters = this.allFilters().filter<NgxComplexFilter>(
                filter =>
                    filter.type === 'complex'
            );

            const results = await Promise.all(
                filters.map(async filter => {
                    const validate = filter.validationBeforeApply();
                    const filterValid = await validate();

                    return filterValid && !filter.applyDisabled();
                })
            );

            valid = results.every(result => result);

            if (!valid) {
                this.scrollToFirstError();
            }
        }

        if (!valid) {
            this.validating.set(false);
            return;
        }

        this.applied.emit();
        this.requireExplicitApply.set(false);
        this.overlayOpen.set(false);
        this.validating.set(false);
    }

    protected scrollToFirstError(): void {
        this.scrollToElement(() =>
            this.filtersContent()?.nativeElement.querySelector<HTMLElement>('.filter.has-error .headline')
        );
    }

    protected contextForSection(item: CdkAccordionItem, headline: HTMLElement): NgxFilterContext {
        return {
            $implicit: (): void => {
                item.close();
                this.scrollToElement(() => headline);
            }
        };
    }

    protected emitResetRequested(): void {
        this.resetRequested.emit();

        if (!this.overlayOpen()) {
            this.requireExplicitApply.set(false);
        }
    }

    protected isSameOverlay(
        templateRef: TemplateRef<unknown>
    ): boolean {
        return this.overlayOpen() && this.overlayContent() === templateRef;
    }


    protected openOverlay(
        trigger: CdkOverlayOrigin,
        templateRef: TemplateRef<unknown>,
        moreFiltersOverlay: boolean,
        requireExplicitApply = false
    ): void {
        this.overlayOpen.set(false);

        if (this.isSameOverlay(templateRef)) {
            return;
        }

        this.overlayOrigin.set(trigger);
        this.overlayContent.set(templateRef);
        this.moreFiltersOverlay.set(moreFiltersOverlay);
        this.requireExplicitApply.set(!moreFiltersOverlay && requireExplicitApply);
        this.overlayOpen.set(true);
    }

    protected collapseAllFilters(): void {
        this.accordion()?.closeAll();
    }

    protected expandAllFilters(): void {
        this.accordion()?.openAll();
    }

    protected onKeydown(
        event: KeyboardEvent,
        trigger: CdkOverlayOrigin,
        templateRef: TemplateRef<unknown>,
        moreFiltersOverlay: boolean,
        requireExplicitApply?: boolean
    ): void {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.openOverlay(trigger, templateRef, moreFiltersOverlay, requireExplicitApply);
        }
    }

    protected closeOnBackdropClick(): void {
        if (!this.moreFiltersOverlay() && !this.requireExplicitApply()) {
            this.overlayOpen.set(false);
        }
    }

    private getVisibleFiltersEndIndex(availableSpace: number, elements: readonly HTMLElement[]): number {
        const firstEl = elements[0];

        if (!firstEl || availableSpace <= 0 || availableSpace - firstEl.offsetWidth < 0) {
            return -1;
        }

        let residualAvailableSpace = availableSpace;

        const visibleFiltersEndIndex = elements.findIndex(el => {
            residualAvailableSpace -= el.offsetWidth + 16;
            return residualAvailableSpace <= 0;
        });

        return visibleFiltersEndIndex >= 0 ? visibleFiltersEndIndex : elements.length - 1;
    }

    private scrollToElement(getTarget: () => HTMLElement | null | undefined): void {
        requestAnimationFrame(() => {
            const target = getTarget();
            target?.scrollIntoView({ block: 'start' });
        });
    }
}
