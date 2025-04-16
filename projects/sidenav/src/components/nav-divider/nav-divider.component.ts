/* eslint-disable @typescript-eslint/member-ordering */
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    HostBinding,
    inject,
    input,
    InputSignal
} from '@angular/core';

import { SidebarDirection, SidebarTheme } from '../../enums';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
    selector: 'ngx-nav-divider',
    host: {
        class: 'ngx-nav-divider'
    },
    template: '<div class="ngx-nav-divider-wrapper"></div>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavDividerComponent {
    @HostBinding('class')
    public hostClass = '';

    // # Injects
    private nav: SidenavComponent | null = inject(SidenavComponent, { host: true, optional: true });

    // # Inputs
    public readonly direction: InputSignal<SidebarDirection | undefined> = input<SidebarDirection | undefined>(undefined);
    public readonly theme: InputSignal<SidebarTheme | undefined> = input<SidebarTheme | undefined>(undefined);
    protected readonly directionClass = computed<SidebarDirection>(() => {
        const direction = this.direction() ?? this.nav?.direction();
        switch (direction) {
            case 'horizontal':
                return 'horizontal';
            case 'vertical':
            default:
                return 'vertical';
        }
    });

    protected readonly themeClass = computed(() => {
        const theme = this.theme() ?? this.nav?.theme();
        switch (theme) {
            case 'dark':
                return 'ngx-nav-divider-dark-theme';
            case 'light':
                return 'ngx-nav-divider-light-theme';
            case 'none':
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
