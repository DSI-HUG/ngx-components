/* eslint-disable @typescript-eslint/member-ordering */
import { computed, Directive, HostBinding, input, InputSignal } from '@angular/core';

import { NavItemStyle } from '../enums';

@Directive({
    selector: '[navItemStyle]'
})
export class NavItemStyleDirective {

    public readonly style: InputSignal<NavItemStyle> = input<NavItemStyle>('none', { alias: 'navItemStyle' });
    private styleClass = computed(() => `ngx-nav-${this.style()}-style`);

    @HostBinding('class')
    public get hostClass(): string {
        return this.styleClass();
    }
}
