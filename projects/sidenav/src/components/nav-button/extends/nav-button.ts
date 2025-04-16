/* eslint-disable @typescript-eslint/member-ordering */
import {
    computed,
    Directive,
    ElementRef,
    HostListener,
    inject,
    input,
    InputSignal,
    Renderer2,
    Signal,
    signal
} from '@angular/core';
import { compact } from 'lodash-es';

import { NavItemState, SidebarTheme } from '../../../enums';
import { provideNavButtonTokens } from '../../../tokens/nav-button.tokens';
import { SidenavComponent } from '../../sidenav/sidenav.component';
import { NavButtonService } from '../nav-button.service';

@Directive({
    providers: provideNavButtonTokens(NavButton)
})
export abstract class NavButton {
    // ## Selected
    public readonly isSelected = input<boolean | undefined>(undefined, { alias: 'selected' });
    protected readonly id: string = 'nav-abstract-button';
    // # Injection
    protected readonly element = inject(ElementRef);
    protected readonly renderer = inject(Renderer2);
    protected readonly navButtonService = inject(NavButtonService);
    protected sidenav: SidenavComponent | null = inject(SidenavComponent, { host: true, optional: true });
    // # Input
    public readonly _name = input<string>(''); // To debug
    public readonly state: InputSignal<NavItemState | undefined> = input<NavItemState | undefined>();
    public readonly disabled = input<boolean>(false);

    // # Signals
    public readonly isMouseDown = signal<boolean>(false);
    public readonly isMouseOver = signal<boolean>(false);
    protected parent: NavButton | null = inject(NavButton, { host: true, optional: true });
    // ## Theme
    public readonly theme: InputSignal<SidebarTheme | undefined> = input<SidebarTheme | undefined>(undefined);
    public readonly getTheme: Signal<SidebarTheme> = computed<SidebarTheme>(
        () => this.theme() ?? this.parent?.getTheme() ?? this.sidenav?.getTheme() ?? 'none'
    );

    // ## Selected
    private readonly _setSelected = signal<boolean>(false);
    public readonly getSelected = computed(() => this.isSelected() ?? this._setSelected());

    public readonly setSelected = (value: boolean): void => this._setSelected.set(value);

    // # Computed
    public readonly navButtonClass = computed(() =>
        compact([
            this.isMouseDown() ? 'mousedown' : undefined,
            this.isMouseOver() ? 'mouseover' : undefined,
            ...this.navButtonService.getHostClass({
                id: this.id,
                disable: this.disabled(),
                isSelected: this.getSelected(),
                state: this.state(),
                theme: this.getTheme()
            })
        ])
    );

    @HostListener('mousedown')
    public handleMousedown(): void {
        this.isMouseDown.set(true);
    }

    @HostListener('mouseup')
    public handleMouseUp(): void {
        this.isMouseDown.set(false);
    }

    @HostListener('mouseover')
    public handleMouseover(): void {
        this.isMouseOver.set(true);
    }

    @HostListener('mouseleave')
    public handleMouseleave(): void {
        this.isMouseOver.set(false);
        this.isMouseDown.set(false);
    }
}
