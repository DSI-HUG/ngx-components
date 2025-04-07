/* eslint-disable @typescript-eslint/member-ordering */
import { computed, Directive, HostBinding, input } from '@angular/core';

import { NavSize } from '../enums';

@Directive({
    selector: '[navSize]'
})
export class NavSizeDirective {

    @HostBinding('class')
    public get hostClass(): string {
        return this.sizeClass();
    }

    public readonly size = input.required<NavSize>({ alias: 'navSize' });

    protected readonly sizeClass = computed(() => {
        const size = this.size();
        switch (size) {
            case NavSize.XS:
                return 'ngx-nav-size-xs';
            case NavSize.S:
                return 'ngx-nav-size-s';
            case NavSize.L:
                return 'ngx-nav-size-l';
            case NavSize.XL:
                return 'ngx-nav-size-xl';
            case NavSize.M:
            default:
                return 'ngx-nav-size-m';
        }
    });
}
