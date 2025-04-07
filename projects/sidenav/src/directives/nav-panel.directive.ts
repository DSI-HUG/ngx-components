/* eslint-disable @typescript-eslint/member-ordering */
import {
    AfterViewInit,
    computed,
    Directive,
    effect,
    ElementRef,
    inject,
    input,
    OnDestroy,
    TemplateRef
} from '@angular/core';
import { compact, every, get, isArray } from 'lodash-es';

import { NavButton, OpenableComponent } from '../components';
import { NavAction, PanelTriggerMode } from '../enums';
import { GroupInfo } from '../models';
import { NavPanelGroupService } from '../services';
import { NAV_BUTTON } from '../tokens/nav-button.tokens';

@Directive({
    selector: '[navPanel], [navAction]'
})
export class NavPanelDirective implements OnDestroy, AfterViewInit {
    // # Injects
    private readonly groupService = inject(NavPanelGroupService);
    private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
    // # Inputs
    public readonly _openable = input<OpenableComponent[] | OpenableComponent | undefined>(undefined, {
        alias: 'navPanel'
    });

    // # Computed
    public readonly openables = computed(() => {
        const openable = this._openable();
        return compact(
            isArray(openable) ? openable : [
                openable
            ]
        );
    });

    public readonly routerLink = input<string | undefined>();
    public readonly _groupId = input<number | number[]>(undefined, { alias: 'navPanelGroup' });
    public readonly _content = input<TemplateRef<unknown> | TemplateRef<unknown>[]>(undefined, {
        alias: 'navPanelContent'
    });

    public readonly action = input<NavAction>(NavAction.TOGGLE, { alias: 'navAction' });
    public readonly _triggerMode = input<PanelTriggerMode | undefined>(undefined, { alias: 'navTriggerMode' });
    private readonly navButton = inject<NavButton>(NAV_BUTTON);
    public readonly groupInfos = computed(() => {
        const panels = this.openables();
        const contents = this.contents();
        return panels.map((panel, index) => {
            const content = get(contents, index);
            return { panel, content, groupId: panel.groupId() } as GroupInfo;
        });
    });

    public readonly contents = computed(() => {
        const content = this._content();
        return compact(
            isArray(content) ? content : [
                content
            ]
        );
    });

    public readonly triggerMode = computed(() => {
        const triggerMode = this._triggerMode();
        if (!triggerMode) {
            return this.action() === NavAction.OPEN ? PanelTriggerMode.HOVER : PanelTriggerMode.CLICK;
        } else {
            return triggerMode;
        }
    });

    public readonly groupIds = computed(() => {
        const groupId = this._groupId();
        return compact(
            isArray(groupId) ? groupId : [
                groupId
            ]
        );
    });

    // # Properties
    private readonly isTouchDevice: boolean = false;

    public constructor() {
        this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        effect(() => {
            if (!this.routerLink()) {
                const isSelected = every(this.openables()?.map(v => v.isOpen()));
                this.navButton.setSelected(isSelected);
            }
        });
    }

    public ngAfterViewInit(): void {
        const nativeElement = this.element.nativeElement;
        const triggerMode = this.triggerMode();
        if (this.isTouchDevice || triggerMode === PanelTriggerMode.CLICK) {
            nativeElement.addEventListener('click', this.click);
        } else if (triggerMode === PanelTriggerMode.HOVER) {
            nativeElement.addEventListener('mouseenter', this.mouseenter);
        }
    }

    public ngOnDestroy(): void {
        const nativeElement = this.element.nativeElement;
        nativeElement.removeEventListener('click', this.click);
        nativeElement.removeEventListener('mouseenter', this.mouseenter);
    }

    public startAction(isHover = false): void {
        const groupIds = this.groupIds();
        const groupInfos = this.groupInfos();
        switch (this.action()) {
            case NavAction.CLOSE_ALL:
                this.groupService.closeAllGroup();
                break;
            case NavAction.CLOSE_GROUP:
                if (!groupIds.length) {
                    throw new Error('navPanelGroup @Directive is required for navPanelAction CLOSE_GROUP');
                }
                this.groupService.closeGroup(groupInfos);
                break;
            case NavAction.OPEN: {
                if (!groupInfos.length) {
                    throw new Error('navPanelTriggerFor @Directive is required for navPanelAction OPEN');
                }
                if (isHover) {
                    this.groupService.overPanel(groupInfos);
                } else {
                    this.groupService.openPanel(groupInfos);
                }
                break;
            }
            case NavAction.CLOSE: {
                if (!groupInfos.length) {
                    throw new Error('navPanelTriggerFor @Directive is required for navPanelAction CLOSE');
                }
                this.groupService.closePanel(groupInfos);
                break;
            }
            case NavAction.TOGGLE:
            default: {
                if (!groupInfos.length) {
                    throw new Error('navPanelTriggerFor @Directive is required for navPanelAction TOGGLE');
                }
                const isOpen = this.groupService.isOpen(groupInfos, 'every');
                groupInfos.forEach(groupInfo =>
                    isOpen ? this.groupService.closePanel(groupInfo) : this.groupService.openPanel(groupInfo)
                );
                break;
            }
        }
    }

    // # Actions
    private readonly click = (): void => this.startAction();

    private readonly mouseenter = (): void => this.startAction(true);
}
