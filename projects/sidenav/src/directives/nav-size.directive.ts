/* eslint-disable @typescript-eslint/member-ordering */
import { computed, Directive, HostBinding, input, InputSignal } from '@angular/core';

import { NavSize } from '../enums';

@Directive({
    selector: '[navSize]'
})
export class NavSizeDirective {

    @HostBinding('class')
    public get hostClass(): string {
        return this.sizeClass();
    }

    public readonly size: InputSignal<NavSize> = input.required<NavSize>({ alias: 'navSize' });
    protected readonly sizeClass = computed(() => {
        const size = this.size();
        switch (size) {
            case 'XS':
                return 'ngx-nav-size-xs';
            case 'S':
                return 'ngx-nav-size-s';
            case 'L':
                return 'ngx-nav-size-l';
            case 'M':
            default:
                return 'ngx-nav-size-m';
        }
    });
}
