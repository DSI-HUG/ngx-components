import { ChangeDetectionStrategy, Component, computed, contentChildren, DestroyRef, effect, ElementRef, inject, input, Renderer2, type Signal, signal, viewChild, ViewEncapsulation } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltip } from '@angular/material/tooltip';

const buttonGap = 12;
const buttonDimensions = 40;

/**
 *
 * @param element
 * @param destroyRef
 * @param box
 * @param defaultSize
 */
export const resizeSignal = (
    element: HTMLElement,
    destroyRef: DestroyRef,
    box: ResizeObserverBoxOptions = 'border-box'
): Signal<ResizeObserverEntry> => {
    const initialValue: ResizeObserverEntry = {
        borderBoxSize: [],
        contentRect: element.getBoundingClientRect(),
        contentBoxSize: [],
        devicePixelContentBoxSize: [],
        target: element
    };

    const value = signal<ResizeObserverEntry>(initialValue);

    const ro = new ResizeObserver(entries => {
        value.set(entries[0] || initialValue);
    });

    ro.observe(element, { box });

    destroyRef.onDestroy(() => {
        ro.disconnect();
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
    // input
    public readonly moreActionsTooltip = input<string>('Plus d\'actions');

    protected readonly hiddenActions = computed(() => {
        const maxVisible = this.getMaxVisibleAction(this.hostWidth());
        return this.iconButtons().slice(maxVisible);
    });

    private readonly iconButtons = contentChildren<MatIconButton, ElementRef<HTMLElement>>(MatIconButton, { read: ElementRef });

    private readonly container = viewChild.required<ElementRef<HTMLElement>>('container');
    private readonly hiddenContainer = viewChild.required<ElementRef<HTMLElement>>('hiddenContainer');

    private readonly hostElement = inject<ElementRef<HTMLElement>>(ElementRef);
    private readonly renderer = inject(Renderer2);
    private readonly destroyRef = inject(DestroyRef);

    private readonly hostSize = resizeSignal(this.hostElement.nativeElement, this.destroyRef);
    private readonly hostWidth = computed(() => this.hostSize().contentRect.width);

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
