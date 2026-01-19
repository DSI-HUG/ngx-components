/* eslint-disable @typescript-eslint/member-ordering */
import {
    AfterViewInit,
    computed,
    Directive,
    effect,
    ElementRef,
    inject,
    input,
    InputSignal,
    OnDestroy,
    Signal,
    TemplateRef
} from '@angular/core';
import { compact, every, get, isArray } from 'lodash-es';

import { NavButton, OpenableComponent } from '../components';
import { NavAction, PanelTriggerMode } from '../enums';
import { GroupInfo } from '../models';
import { NavPanelGroupService } from '../services';
import { NAV_BUTTON } from '../tokens/nav-button.tokens';

@Directive({
    selector: '[navAction]'
})
export class NavActionDirective implements OnDestroy, AfterViewInit {
    // # Injects
    private readonly groupService = inject(NavPanelGroupService);
    private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
    // ## NavAction
    public readonly action: InputSignal<NavAction> = input.required<NavAction>({ alias: 'navAction' });

    // # Inputs
    public readonly routerLink = input<string | undefined>();
    // ## Container
    public readonly _container = input<OpenableComponent[] | OpenableComponent | undefined>(undefined, {
        alias: 'navActionContainer'
    });

    public readonly containers: Signal<OpenableComponent[]> = computed(() => {
        const openable = this._container();
        return compact(
            isArray(openable) ? openable : [
                openable
            ]
        );
    });

    // ## Content
    public readonly _content = input<TemplateRef<unknown> | TemplateRef<unknown>[] | ''>('', {
        alias: 'navActionContent'
    });

    // ## Group
    public readonly _groupId = input<number | number[]>(undefined, { alias: 'navActionGroup' });

    public readonly contents = computed(() => {
        const content = this._content();
        if (content === '') {
            return null;
        }
        return compact(
            isArray(content) ? content : [
                content
            ]
        );
    });

    public readonly groupIds = computed(() => {
        const groupId = this._groupId();
        return compact(
            isArray(groupId) ? groupId : [
                groupId
            ]
        );
    });

    // ## TriggerMode
    public readonly _triggerMode = input<PanelTriggerMode | undefined>(undefined, { alias: 'navActionTriggerMode' });
    public readonly triggerMode: Signal<PanelTriggerMode> = computed(() => {
        const triggerMode = this._triggerMode();
        if (!triggerMode) {
            return this.action() === 'open' ? 'hover' : 'click';
        } else {
            return triggerMode;
        }
    });

    // # Computed
    public readonly groupInfos = computed(() => {
        const panels = this.containers();
        const contents = this.contents() ?? [];
        return panels.map((panel, index) => {
            const content = get(contents, index);
            return { panel, content, groupId: panel.groupId?.() } as GroupInfo;
        });
    });

    private readonly navButton = inject<NavButton>(NAV_BUTTON);

    // # Properties
    private readonly isTouchDevice: boolean = false;

    public constructor() {
        this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        effect(() => {
            if (!this.routerLink()) {
                const isSelected = every(
                    this.containers()?.filter(v => !!v).map(v => v.isOpen())
                );
                this.navButton.setSelected(isSelected);
            }
        });
    }

    public ngAfterViewInit(): void {
        const nativeElement = this.element.nativeElement;
        const triggerMode = this.triggerMode();
        if (this.isTouchDevice || triggerMode === 'click') {
            nativeElement.addEventListener('click', this.click);
        } else if (triggerMode === 'hover') {
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
        const contents = this.contents();
        switch (this.action()) {
            case 'close-all':
                this.groupService.closeAllGroup();
                break;
            case 'close-group':
                if (!groupIds.length) {
                    throw new Error('group @Directive is required for navAction CLOSE_GROUP');
                }
                this.groupService.closeGroup(groupInfos);
                break;
            case 'open': {
                if (contents === null) {
                    this.groupService.closeAllHoverPanel();
                } else {
                    if (!groupInfos.length) {
                        throw new Error('container @Directive is required for navAction OPEN');
                    }
                    if (isHover) {
                        this.groupService.overPanel(groupInfos);
                    } else {
                        this.groupService.openPanel(groupInfos);
                    }
                }
                break;
            }
            case 'close': {
                if (!groupInfos.length) {
                    throw new Error('container @Directive is required for navAction CLOSE');
                }
                this.groupService.closePanel(groupInfos);
                break;
            }
            case 'toggle':
            default: {
                if (!groupInfos.length) {
                    throw new Error('container @Directive is required for navAction TOGGLE');
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
