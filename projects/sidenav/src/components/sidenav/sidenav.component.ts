/* eslint-disable @typescript-eslint/member-ordering, @angular-eslint/prefer-on-push-component-change-detection, @angular-eslint/component-max-inline-declarations*/
import { Component, computed, effect, HostBinding, input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { compact } from 'lodash-es';

import { SidebarDirection, SidebarLocation, SidebarTheme } from '../../enums';

@Component({
    selector: 'ngx-sidenav',
    imports: [
        // Components
        MatDividerModule,
        MatIconModule
    ],
    template: `
        <div class="ngx-sidenav-layer">
            <div class="ngx-sidenav-content">
                <div class="ngx-sidenav-wrapper">
                    <ng-content></ng-content>
                </div>
            </div>
        </div>
    `
})
export class SidenavComponent {
    @HostBinding('class')
    public hostClass = '';

    // # Input
    public readonly location = input<SidebarLocation>(SidebarLocation.LEFT);
    public readonly theme = input<SidebarTheme>(SidebarTheme.NONE);
    public readonly getTheme = computed<SidebarTheme>(() => this.theme());
    public readonly disabled = input(false);
    // # Computed
    public readonly direction = computed(() => {
        const location = this.location();
        switch (location) {
            case SidebarLocation.BOTTOM:
            case SidebarLocation.TOP:
                return SidebarDirection.HORIZONTAL;
            case SidebarLocation.RIGHT:
            case SidebarLocation.LEFT:
            default:
                return SidebarDirection.VERTICAL;
        }
    });

    protected readonly locationClass = computed(() => {
        const location = this.location();
        switch (location) {
            case SidebarLocation.RIGHT:
                return 'ngx-nav-location-right';
            case SidebarLocation.TOP:
                return 'ngx-nav-location-top';
            case SidebarLocation.BOTTOM:
                return 'ngx-nav-location-bottom';
            case SidebarLocation.LEFT:
            default:
                return 'ngx-nav-location-left';
        }
    });

    protected readonly directionClass = computed(() => {
        const direction = this.direction();
        switch (direction) {
            case SidebarDirection.VERTICAL:
                return 'ngx-nav-direction-vertical';
            case SidebarDirection.HORIZONTAL:
            default:
                return 'ngx-nav-direction-horizontal';
        }
    });

    protected readonly themeClass = computed(() => {
        switch (this.theme()) {
            case SidebarTheme.DARK:
                return 'ngx-nav-dark-theme';
            case SidebarTheme.LIGHT:
                return 'ngx-nav-light-theme';
            case SidebarTheme.NONE:
            default:
                return undefined;
        }
    });

    public constructor() {
        effect(() => {
            const disabled = this.disabled() ? 'disabled' : undefined;
            this.hostClass = compact([
                'ngx-sidenav',
                this.locationClass(),
                this.directionClass(),
                this.themeClass(),
                disabled
            ]).join(' ');
        });
    }
}
