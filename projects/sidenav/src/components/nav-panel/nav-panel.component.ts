/* eslint-disable @typescript-eslint/member-ordering */
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    HostBinding,
    HostListener,
    input,
    InputSignal,
    Signal,
    signal
} from '@angular/core';
import { compact } from 'lodash-es';

import { PanelTheme, PanelType, SidebarLocation, SidebarPosition } from '../../enums';
import { provideOpenableTokens } from '../../tokens/openable.tokens';
import { DynamicContentComponent } from './extends/dynamic-content.component';
import { navPanelAnimations } from './nav-panel.animations';

@Component({
    selector: 'ngx-nav-panel',
    templateUrl: './nav-panel.component.html',
    providers: [
        provideOpenableTokens(NavPanelComponent)
    ],
    animations: navPanelAnimations,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavPanelComponent extends DynamicContentComponent {
    protected readonly id: string = 'ngx-nav-panel';
    protected override readonly autoHide = false;

    @HostBinding('class')
    public hostClass = '';

    // # Inputs
    public readonly panelType: InputSignal<PanelType> = input<PanelType>('open-right');
    public readonly panelTheme: InputSignal<PanelTheme> = input<PanelTheme>('m3');

    // # Signals
    protected readonly panelVisibleClass = signal<'visible' | 'hidden' | 'visible-end' | 'hidden-end'>('hidden');
    public readonly location: Signal<SidebarLocation> = computed(() => {
        const theme = this.panelType();
        switch (theme) {
            case 'overlay-open-left':
            case 'fixed-open-left':
            case 'open-left':
                return 'right';
            case 'overlay-open-right':
            case 'fixed-open-right':
            case 'open-right':
            default:
                return 'left';
        }
    });

    public readonly position: Signal<SidebarPosition> = computed(() => {
        const theme = this.panelType();
        switch (theme) {
            case 'overlay-open-left':
            case 'overlay-open-right':
                return 'overlay';
            case 'fixed-open-left':
            case 'fixed-open-right':
                return 'fixed';
            case 'open-left':
            case 'open-right':
            default:
                return 'relative';
        }
    });

    protected readonly typeClass = computed(() => {
        const theme = this.panelType();
        switch (theme) {
            case 'overlay-open-right':
                return 'ngx-nav-panel-overlay-open-right';
            case 'overlay-open-left':
                return 'ngx-nav-panel-overlay-open-left';
            case 'fixed-open-right':
                return 'ngx-nav-panel-fixed-open-right';
            case 'fixed-open-left':
                return 'ngx-nav-panel-fixed-open-left';
            case 'open-left':
                return 'ngx-nav-panel-open-left';
            case 'open-right':
            default:
                return 'ngx-nav-panel-open-right';
        }
    });

    protected readonly themeClass = computed(() => {
        const theme = this.panelTheme();
        switch (theme) {
            case 'm3':
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
