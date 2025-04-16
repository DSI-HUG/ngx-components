/* eslint-disable @typescript-eslint/member-ordering */
import { Directive, effect } from '@angular/core';

import { provideNavButtonTokens } from '../../tokens/nav-button.tokens';
import { NavButton } from './extends/nav-button';

@Directive({
    selector: '[nav-button]',
    providers: [
        provideNavButtonTokens(NavButtonDirective)
    ]
})
export class NavButtonDirective extends NavButton {
    protected override readonly id: string = 'ngx-nav-icon-text-button';

    public constructor() {
        super();
        let hostClass: string[] = [];
        effect(() => {
            hostClass.forEach(className => this.renderer.removeClass(this.element.nativeElement, className));
            hostClass = this.navButtonClass();
            hostClass.forEach(className => this.renderer.addClass(this.element.nativeElement, className));
        });
    }
}

@Directive({
    selector: '[nav-icon-button]',
    providers: [
        provideNavButtonTokens(NavIconButtonDirective)
    ]
})
export class NavIconButtonDirective extends NavButtonDirective {
    protected override readonly id = 'ngx-nav-icon-only-button';
}
