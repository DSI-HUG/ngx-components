/* eslint-disable @typescript-eslint/member-ordering, @angular-eslint/prefer-on-push-component-change-detection */
import { Component, computed, effect, HostBinding, inject, input } from '@angular/core';

import { SidebarDirection, SidebarTheme } from '../../enums';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
    selector: 'ngx-nav-divider',
    host: {
        class: 'ngx-nav-divider'
    },
    template: '<div class="ngx-nav-divider-wrapper"></div>'
})
export class NavDividerComponent {
    @HostBinding('class')
    public hostClass = '';

    // # Injects
    private nav: SidenavComponent | null = inject(SidenavComponent, { host: true, optional: true });

    // # Inputs
    public readonly direction = input<SidebarDirection | undefined>(undefined);
    public readonly theme = input<SidebarTheme | undefined>(undefined);

    // # Computed
    protected readonly directionClass = computed(() => {
        const direction = this.direction() ?? this.nav?.direction();
        switch (direction) {
            case SidebarDirection.HORIZONTAL:
                return SidebarDirection.HORIZONTAL;
            case SidebarDirection.VERTICAL:
            default:
                return SidebarDirection.VERTICAL;
        }
    });

    protected readonly themeClass = computed(() => {
        const theme = this.theme() ?? this.nav?.theme();
        switch (theme) {
            case SidebarTheme.DARK:
                return 'ngx-nav-divider-dark-theme';
            case SidebarTheme.LIGHT:
                return 'ngx-nav-divider-light-theme';
            case SidebarTheme.NONE:
            default:
                return undefined;
        }
    });

    public constructor() {
        effect(() => {
            this.hostClass = [
                this.directionClass(),
                this.themeClass()
            ].join(' ');
        });
    }
}
