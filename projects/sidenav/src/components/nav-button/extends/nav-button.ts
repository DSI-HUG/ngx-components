/* eslint-disable @typescript-eslint/member-ordering */
import {
    booleanAttribute,
    computed,
    Directive,
    ElementRef,
    HostListener,
    inject,
    input,
    InputSignal,
    InputSignalWithTransform,
    Renderer2,
    Signal,
    signal
} from '@angular/core';
import { compact } from 'lodash-es';

import { NavButtonState, SidebarTheme } from '../../../enums';
import { provideNavButtonTokens } from '../../../tokens/nav-button.tokens';
import { SidenavComponent } from '../../sidenav/sidenav.component';
import { NavButtonService } from '../nav-button.service';

@Directive({
    providers: provideNavButtonTokens(NavButton)
})
export abstract class NavButton {
    protected readonly id: string = 'nav-abstract-button';
    // # Injection
    protected readonly element = inject(ElementRef);
    protected readonly renderer = inject(Renderer2);
    protected readonly navButtonService = inject(NavButtonService);
    protected sidenav: SidenavComponent | null = inject(SidenavComponent, { optional: true });
    protected parent: NavButton | null = inject(NavButton, { host: true, optional: true });
    // # Input
    public readonly _name = input<string>(''); // To debug
    public readonly state: InputSignal<NavButtonState | undefined> = input<NavButtonState | undefined>();
    public readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, {
        transform: booleanAttribute
    });

    public readonly isSelected: InputSignalWithTransform<boolean, unknown> = input(false, {
        transform: booleanAttribute,
        alias: 'selected'
    });

    // # Signals
    public readonly isMouseDown = signal<boolean>(false);
    public readonly isMouseOver = signal<boolean>(false);
    // ## Theme
    public readonly theme: InputSignal<SidebarTheme | undefined> = input<SidebarTheme | undefined>(undefined);
    public readonly getTheme: Signal<SidebarTheme> = computed<SidebarTheme>(() =>
        this.theme() ?? this.parent?.getTheme() ?? this.sidenav?.getTheme() ?? 'none');

    // ## Selected
    private readonly _setSelected = signal<boolean>(false);
    public readonly getSelected = computed(() => this.isSelected() ?? this._setSelected());

    public readonly setSelected = (value: boolean): void => this._setSelected.set(value);
    // # Computed
    public readonly navButtonClass = computed(() => compact([
        this.isMouseDown() ? 'mousedown' : undefined,
        this.isMouseOver() ? 'mouseover' : undefined,
        ...this.navButtonService.getHostClass({
            id: this.id,
            disable: this.disabled(),
            isSelected: this.getSelected(),
            state: this.state(),
            theme: this.getTheme()
        })
    ]));

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
