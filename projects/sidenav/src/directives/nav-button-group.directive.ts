/* eslint-disable @typescript-eslint/member-ordering */
import { Directive, ElementRef, inject, Renderer2 } from '@angular/core';

@Directive({
    selector: '[nav-button-group]'
})
export class NavButtonGroupDirective {
    protected readonly element = inject(ElementRef);
    protected readonly renderer = inject(Renderer2);

    public constructor() {
        this.renderer.addClass(this.element.nativeElement, 'ngx-nav-button-group');
    }
}
