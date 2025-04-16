/* eslint-disable @typescript-eslint/member-ordering, @angular-eslint/component-max-inline-declarations*/
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    HostBinding,
    input,
    InputSignal,
    Signal
} from '@angular/core';
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
        <nav class="ngx-sidenav-layer">
            <div class="ngx-sidenav-content">
                <div class="ngx-sidenav-wrapper">
                    <ng-content></ng-content>
                </div>
            </div>
        </nav>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavComponent {
    @HostBinding('class')
    public hostClass = '';

    // # Input
    public readonly location: InputSignal<SidebarLocation> = input<SidebarLocation>('left');
    public readonly theme: InputSignal<SidebarTheme> = input<SidebarTheme>('none');
    public readonly getTheme: Signal<SidebarTheme> = computed<SidebarTheme>(() => this.theme());
    public readonly disabled = input(false);
    // # Computed
    public readonly direction: Signal<SidebarDirection> = computed<SidebarDirection>(() => {
        const location = this.location();
        switch (location) {
            case 'bottom':
            case 'top':
                return 'horizontal';
            case 'right':
            case 'left':
            default:
                return 'vertical';
        }
    });

    protected readonly locationClass = computed(() => {
        const location = this.location();
        switch (location) {
            case 'right':
                return 'ngx-nav-location-right';
            case 'top':
                return 'ngx-nav-location-top';
            case 'bottom':
                return 'ngx-nav-location-bottom';
            case 'left':
            default:
                return 'ngx-nav-location-left';
        }
    });

    protected readonly directionClass = computed(() => {
        const direction = this.direction();
        switch (direction) {
            case 'vertical':
                return 'ngx-nav-direction-vertical';
            case 'horizontal':
            default:
                return 'ngx-nav-direction-horizontal';
        }
    });

    protected readonly themeClass = computed(() => {
        switch (this.theme()) {
            case 'dark':
                return 'ngx-nav-dark-theme';
            case 'light':
                return 'ngx-nav-light-theme';
            case 'none':
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
