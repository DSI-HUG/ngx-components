/* eslint-disable @typescript-eslint/member-ordering, @angular-eslint/prefer-on-push-component-change-detection */
import { Component, computed, effect, HostBinding, HostListener, input, signal } from '@angular/core';
import { compact } from 'lodash-es';

import { PanelTheme, PanelType, SidebarLocation, SidebarPosition } from '../../enums';
import { provideOpenableTokens } from '../../tokens/openable.tokens';
import { DynamicContentComponent } from './generics/dynamic-content.component';
import { navPanelAnimations } from './nav-panel.animations';

@Component({
    selector: 'ngx-nav-panel',
    templateUrl: './nav-panel.component.html',
    providers: [
        provideOpenableTokens(NavPanelComponent)
    ],
    animations: navPanelAnimations
})
export class NavPanelComponent extends DynamicContentComponent {
    protected readonly id: string = 'ngx-nav-panel';
    protected override readonly autoHide = false;

    @HostBinding('class')
    public hostClass = '';

    // # Inputs
    public readonly panelType = input<PanelType>(PanelType.OPEN_RIGHT);
    public readonly panelTheme = input<PanelTheme>(PanelTheme.MATERIAL_3);

    // # Signals
    protected readonly panelVisibleClass = signal<'visible' | 'hidden' | 'visible-end' | 'hidden-end'>('hidden');

    protected readonly typeClass = computed(() => {
        const theme = this.panelType();
        switch (theme) {
            case PanelType.OVERLAY_OPEN_RIGHT:
                return 'ngx-nav-panel-overlay-open-right';
            case PanelType.OVERLAY_OPEN_LEFT:
                return 'ngx-nav-panel-overlay-open-left';
            case PanelType.FIXED_OPEN_RIGHT:
                return 'ngx-nav-panel-fixed-open-right';
            case PanelType.FIXED_OPEN_LEFT:
                return 'ngx-nav-panel-fixed-open-left';
            case PanelType.OPEN_LEFT:
                return 'ngx-nav-panel-open-left';
            case PanelType.OPEN_RIGHT:
            default:
                return 'ngx-nav-panel-open-right';
        }
    });

    public readonly location = computed(() => {
        const theme = this.panelType();
        switch (theme) {
            case PanelType.OVERLAY_OPEN_LEFT:
            case PanelType.FIXED_OPEN_LEFT:
            case PanelType.OPEN_LEFT:
                return SidebarLocation.RIGHT;
            case PanelType.OVERLAY_OPEN_RIGHT:
            case PanelType.FIXED_OPEN_RIGHT:
            case PanelType.OPEN_RIGHT:
            default:
                return SidebarLocation.LEFT;
        }
    });

    public readonly position = computed(() => {
        const theme = this.panelType();
        switch (theme) {
            case PanelType.OVERLAY_OPEN_LEFT:
            case PanelType.OVERLAY_OPEN_RIGHT:
                return SidebarPosition.OVERLAY;
            case PanelType.FIXED_OPEN_LEFT:
            case PanelType.FIXED_OPEN_RIGHT:
                return SidebarPosition.FIXED;
            case PanelType.OPEN_LEFT:
            case PanelType.OPEN_RIGHT:
            default:
                return SidebarPosition.RELATIVE;
        }
    });

    protected readonly themeClass = computed(() => {
        const theme = this.panelTheme();
        switch (theme) {
            case PanelTheme.MATERIAL_3:
                return 'm3-panel';
            default:
                return undefined;
        }
    });

    public constructor() {
        super();
        // Resolve Host classes
        effect(() => {
            this.hostClass = compact([
                this.id,
                this.typeClass(),
                this.themeClass()
            ]).join(' ');
        });

        let lastIsOpen = false;
        effect(() => {
            const isOpen = this.isOpen();
            const group = this.groupService.getPanelGroup(this.groupInfo());
            if (lastIsOpen !== isOpen) {
                if (isOpen) {
                    if (group?.options.isFirstOpen) {
                        this.panelVisibleClass.set('visible');
                    } else { // the group was already open
                        this.panelVisibleClass.set('visible-end');
                    }
                } else if (group) { // same group stay open
                    this.panelVisibleClass.set('hidden-end');
                } else {
                    this.panelVisibleClass.set('hidden');
                }
                lastIsOpen = isOpen;
            }
        });
    }


    @HostBinding('@panelOpen')
    public get panelOpenAnimation(): string {
        return this.panelVisibleClass();
    }

    @HostListener('mouseleave')
    public closePanel(): void {
        this.groupService.closeHoverPanel(this.groupInfo());
    }
}
