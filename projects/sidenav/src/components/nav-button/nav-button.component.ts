/* eslint-disable @typescript-eslint/member-ordering, @typescript-eslint/naming-convention */
import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, HostBinding, input, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { compact } from 'lodash-es';

import { SidebarTheme } from '../../enums';
import { provideNavButtonTokens } from '../../tokens/nav-button.tokens';
import { NavButton } from './extends/nav-button';
import { NavButtonDirective, NavIconButtonDirective } from './nav-button.directive';
import { NavButtonService } from './nav-button.service';

const IMPORTS = [
    RouterModule,
    NgTemplateOutlet,
    // Material
    MatButtonModule,
    MatIconModule,
    MatProgressSpinner,
    // Nav
    NavButtonDirective,
    NavIconButtonDirective
];
const PROVIDERS = [
    NavButtonService
];

@Component({
    selector: 'ngx-nav-button',
    imports: IMPORTS,
    providers: [
        PROVIDERS,
        provideNavButtonTokens(NavButtonComponent)
    ],
    templateUrl: './nav-button.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavButtonComponent extends NavButton {
    protected override readonly id: string = 'ngx-nav-icon-text-button';

    @HostBinding('class')
    public hostClass = '';

    // # Input
    public readonly isLoading = input<boolean>(false, { alias: 'loading' });
    public override readonly getTheme: Signal<SidebarTheme> = computed(
        () => this.theme() ?? this.sidenav?.theme() ?? 'none'
    );

    // # Computed
    private readonly loadingClass = computed(() => (this.isLoading() ? 'ngx-nav-button-loading' : undefined));

    public constructor() {
        super();
        effect(() => {
            if (this.isLoading()) {
                this.hostClass = compact([
                    ...this.navButtonClass(),
                    this.loadingClass()
                ]).join(' ');
            } else {
                this.hostClass = this.navButtonClass().join(' ');
            }
        });
    }
}

@Component({
    selector: 'ngx-nav-icon-button',
    imports: IMPORTS,
    providers: [
        PROVIDERS,
        provideNavButtonTokens(NgxNavIconButtonComponent)
    ],
    templateUrl: './nav-button.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxNavIconButtonComponent extends NavButtonComponent {
    protected override readonly id: string = 'ngx-nav-icon-only-button';
}
