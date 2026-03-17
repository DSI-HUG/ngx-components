import { ChangeDetectionStrategy, Component, computed, contentChildren, effect, ElementRef, inject, Renderer2, type Signal, signal, viewChild, ViewEncapsulation } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltip } from '@angular/material/tooltip';

import { NgxLayoutIntl } from '../providers';

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
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatIcon,
        MatIconButton,
        MatTooltip,
        MatMenuModule
    ]
})
export class NgxActionsGroupComponent {
    protected readonly hiddenActions = computed(() => {
        const maxVisible = this.getMaxVisibleAction(this.hostWidth());
        return this.iconButtons().slice(maxVisible);
    });

    protected readonly intl = inject(NgxLayoutIntl, { optional: true });

    private readonly iconButtons = contentChildren<MatIconButton, ElementRef<HTMLElement>>(MatIconButton, { read: ElementRef });

    private readonly container = viewChild.required<ElementRef<HTMLElement>>('container');
    private readonly hiddenContainer = viewChild.required<ElementRef<HTMLElement>>('hiddenContainer');

    private readonly hostElement = inject<ElementRef<HTMLElement>>(ElementRef);
    private readonly renderer = inject(Renderer2);

    private readonly hostSize = resizeSignal(() => this.hostElement);
    private readonly hostWidth = computed(() => Math.ceil(this.hostSize()?.contentRect.width || 0));

    private readonly visibleActions = computed(() => {
        const maxVisible = this.getMaxVisibleAction(this.hostWidth());
        return this.iconButtons().slice(0, maxVisible);
    });

    public constructor() {

        effect(() => {
            const buttons = this.iconButtons();

            if (buttons.length === 0) {
                return;
            }

            const visibleButtons = this.visibleActions();
            const containerEl = this.container();
            visibleButtons.forEach(button => {
                const element = button.nativeElement;
                containerEl.nativeElement.appendChild(element);
            });

            const hiddenButtons = this.hiddenActions();
            const hiddenContainerEl = this.hiddenContainer();
            if (hiddenButtons.length > 0) {
                hiddenButtons.forEach(button => {
                    const element = button.nativeElement;

                    const hasMenu =
                        element.classList.contains('mat-mdc-menu-trigger');

                    if (hasMenu) {
                        this.renderer.listen(element, 'click', (event: MouseEvent) => {
                            event.stopPropagation();
                        });
                    }

                    hiddenContainerEl.nativeElement.appendChild(element);
                });
            }
        });
    }

    private getMaxVisibleAction(width: number): number {

        const maxNumberOfActions = Math.floor(width / (buttonDimensions + buttonGap));

        const maxVisibleActions = Math.max(1, maxNumberOfActions);

        const totalButtons = this.iconButtons().length;

        if (maxVisibleActions >= totalButtons) {
            return totalButtons;
        }

        // -1 => Allows for the more button to be displayed
        return maxVisibleActions - 1;
    }
}
