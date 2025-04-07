/* eslint-disable @typescript-eslint/member-ordering */
import { computed, Directive, ElementRef, HostListener, inject, input, Renderer2, Signal, signal } from '@angular/core';
import { compact } from 'lodash-es';

import { NavItemState, NavItemStyle, SidebarTheme } from '../../../enums';
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
    public readonly _name = input<string>(''); // To de bug
    public readonly state = input<NavItemState | undefined>();
    public readonly style = input<NavItemStyle>(NavItemStyle.NONE);
    public readonly disabled = input<boolean>(false);

    // # Signals
    public readonly isMouseDown = signal<boolean>(false);
    public readonly isMouseOver = signal<boolean>(false);
    protected parent: NavButton | null = inject(NavButton, { host: true, optional: true });

    // ## Theme
    public readonly theme = input<SidebarTheme | undefined>(undefined);
    // # Computed
    public readonly navButtonClass = computed(() =>
        compact([
            this.isMouseDown() ? 'mousedown' : undefined,
            this.isMouseOver() ? 'mouseover' : undefined,
            ...this.navButtonService.getHostClass({
                id: this.id,
                disable: this.disabled(),
                isSelected: this.getSelected(),
                style: this.style(),
                state: this.state(),
                theme: this.getTheme()
            })
        ])
    );

    public readonly getTheme: Signal<SidebarTheme> = computed<SidebarTheme>(
        () => this.theme() ?? this.parent?.getTheme() ?? this.sidenav?.getTheme() ?? SidebarTheme.NONE
    );

    private readonly _setSelected = signal<boolean>(false);
    public readonly getSelected = computed(() => {
        if ([
            'counter_1',
            'counter_2'
        ].includes(this._name())) {
            console.error(this._name(), 'isOpen isSelected:', this.isSelected(), '_setSelected:', this._setSelected());
        }
        return this.isSelected() ?? this._setSelected();
    });

    public readonly setSelected = (value: boolean): void => this._setSelected.set(value);

    @HostListener('mousedown')
    public handelMousedown(): void {
        this.isMouseDown.set(true);
    }

    @HostListener('mouseup')
    public handelMouseUp(): void {
        this.isMouseDown.set(false);
    }

    @HostListener('mouseover')
    public handelMouseover(): void {
        this.isMouseOver.set(true);
    }

    @HostListener('mouseleave')
    public handelMouseleave(): void {
        this.isMouseOver.set(false);
        this.isMouseDown.set(false);
    }
}
