import { afterRenderEffect, ChangeDetectionStrategy, Component, computed, contentChild, effect, input, signal, untracked, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { NgxSearchInputDirective } from './directives/search-input.directive';

// type SearchBarContainerSize = 'medium' | 'small';

@Component({
    selector: 'ngx-search-bar-container',
    templateUrl: './search-bar-container.component.html',
    styleUrl: './search-bar-container.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatIconModule, MatButtonModule, MatTooltipModule]
    /*
    host: {
        '[class.small]': 'size()==="small"'
    }
    */
})
export class NgxSearchBarContainerComponent {
    // inputs
    public readonly folded = input<boolean>(false);

    /*
    protected size = input<SearchBarContainerSize>('medium');
    protected sizeButtonAttributeName = input<string>();
    protected sizeButtonAttributeValue = input<string>();
    */

    protected readonly clearTooltip = 'Effacer la recherche';
    protected readonly openTooltip = 'Ouvrir la barre de recherche';

    protected readonly manualFoldingState = signal<boolean>(true);
    protected readonly isFolded = computed(() => this.folded() && this.manualFoldingState() && !this.searchText());

    protected readonly searchInput = contentChild(NgxSearchInputDirective);
    protected readonly searchText = computed(() => this.searchInput()?.value());

    /*
    private hostElement = inject(ElementRef);
    private renderer = inject(Renderer2);
    */

    public constructor() {

        /*
        afterRender(() => {
            const containerElement = this.hostElement.nativeElement;
            const buttons = containerElement.querySelectorAll('button') as NodeListOf<HTMLElement>;

            buttons.forEach((button: HTMLElement) => {
                if (this.sizeButtonAttributeName()?.trim() && this.sizeButtonAttributeValue()?.trim()) {
                    this.renderer.setAttribute(button, this.sizeButtonAttributeName(), this.sizeButtonAttributeValue());
                }

            });
        });
        */

        afterRenderEffect(() => {
            const searchInput = this.searchInput();
            if (!searchInput) {
                return;
            }

            if (!this.isFolded()) {
                searchInput.focus();
            }
        });

        effect(() => {
            const baseFoldStatus = this.folded();

            if (baseFoldStatus) {
                const searchText = untracked(this.searchText);
                const blurred = this.searchInput()?.blurred();

                if (blurred && !searchText) {
                    this.toggleFolded();
                }
            }
        });
    }

    protected toggleFolded(): void {
        this.manualFoldingState.update(folded => !folded);
    }

    protected resetInput(): void {
        const searchInput = this.searchInput();

        if (!searchInput) {
            return;
        }

        searchInput.reset();
        searchInput.focus();
    }
}

