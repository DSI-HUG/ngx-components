/* eslint-disable @typescript-eslint/member-ordering */
import { computed, Directive, HostBinding, input, InputSignal } from '@angular/core';

import { NavButtonStyle } from '../enums';

@Directive({
    selector: '[navButtonStyle]'
})
export class NavButtonStyleDirective {
    @HostBinding('class')
    public get hostClass(): string {
        return this.styleClass();
    }

    public readonly style: InputSignal<NavButtonStyle> = input<NavButtonStyle>('none', { alias: 'navButtonStyle' });
    private styleClass = computed(() => `ngx-nav-style-${this.style()}`);
}
