/* eslint-disable @typescript-eslint/member-ordering */
import { computed, Directive, HostBinding, input } from '@angular/core';

import { NavJustify } from '../enums';

@Directive({
    selector: '[navJustify]'
})
export class NavJustifyDirective {
    public readonly align = input.required<NavJustify>({ alias: 'navJustify' });
    protected readonly sizeClass = computed(() => {
        const align = this.align();
        switch (align) {
            case NavJustify.END:
                return 'ngx-nav-justify-end';
            case NavJustify.CENTER:
                return 'ngx-nav-justify-center';
            case NavJustify.START:
            default:
                return 'ngx-nav-justify-start';
        }
    });

    @HostBinding('class')
    public get hostClass(): string {
        return this.sizeClass();
    }
}
