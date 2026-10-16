import { ChangeDetectionStrategy, Component, computed, contentChildren, effect, ElementRef, inject, type Signal, signal, ViewEncapsulation } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatTooltip } from '@angular/material/tooltip';

import { NgxLayoutIntl } from '../providers';
import { NgxActionDirective } from './action.directive';

const buttonGap = 12;
const buttonDimensions = 40;

/**
 *
 * @param element
 * @param destroyRef
 * @param box
 * @param defaultSize
 */
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
    selector: 'ngx-actions-group',
    templateUrl: './actions-group.component.html',
    styleUrl: './actions-group.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        MatIcon,
        MatIconButton,
        MatTooltip,
        MatMenu,
        MatMenuItem,
        MatMenuTrigger
    ]
})
export class NgxActionsGroupComponent {

    protected readonly intl = inject(NgxLayoutIntl, { optional: true });

    protected visibleItems = computed(() => this.itemsCategory().visible);

    protected hiddenItems = computed(() => this.itemsCategory().hidden);

    private readonly items = contentChildren<NgxActionDirective>(NgxActionDirective);

    private readonly itemsCategory = computed(() => {
        const items = this.items();
        const maxItems = this.getMaxVisibleAction(this.hostWidth());
        return {
            visible: items.slice(0, maxItems),
            hidden: items.slice(maxItems)
        };
    });

    private readonly hostElement = inject<ElementRef<HTMLElement>>(ElementRef);

    private readonly hostSize = resizeSignal(() => this.hostElement);
    private readonly hostWidth = computed(() => Math.ceil(this.hostSize()?.contentRect.width || 0));

    private getMaxVisibleAction(width: number): number {

        const maxNumberOfActions = Math.floor(width / (buttonDimensions + buttonGap));

        const maxVisibleActions = Math.max(1, maxNumberOfActions);

        const totalButtons = this.items().length;

        if (maxVisibleActions >= totalButtons) {
            return totalButtons;
        }

        // -1 => Allows for the more button to be displayed
        return Math.max(0, maxVisibleActions - 1);
    }
}
