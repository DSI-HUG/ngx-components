/* eslint-disable @typescript-eslint/member-ordering */
import { computed, Directive, HostBinding, input, InputSignal } from '@angular/core';

import { NavJustify } from '../enums';

@Directive({
    selector: '[navJustify]'
})
export class NavJustifyDirective {
    public readonly align: InputSignal<NavJustify> = input.required<NavJustify>({ alias: 'navJustify' });
    protected readonly sizeClass = computed(() => {
        const align = this.align();
        switch (align) {
            case 'end':
                return 'ngx-nav-justify-end';
            case 'center':
                return 'ngx-nav-justify-center';
            case 'start':
            default:
                return 'ngx-nav-justify-start';
        }
    });

    @HostBinding('class')
    public get hostClass(): string {
        return this.sizeClass();
    }
}
