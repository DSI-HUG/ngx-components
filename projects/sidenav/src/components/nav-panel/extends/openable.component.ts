/* eslint-disable @typescript-eslint/member-ordering */
import {
    AfterViewInit,
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    ElementRef,
    HostBinding,
    inject,
    input,
    InputSignalWithTransform,
    numberAttribute,
    OnDestroy,
    Renderer2,
    signal
} from '@angular/core';
import { clone, pick } from 'lodash-es';

import { GroupInfo } from '../../../models';
import { NavPanelGroupService } from '../../../services';
import { PanelRegistry } from '../../../services/panel.registry';
import { PARENT_OPENABLE, provideOpenableTokens } from '../../../tokens/openable.tokens';

@Component({
    selector: 'ngx-openable',
    providers: [
        provideOpenableTokens(OpenableComponent)
    ],
    template: `
        <ng-content></ng-content>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OpenableComponent implements OnDestroy, AfterViewInit {
    /** Force to define the GroupIds himself */
    /** Force to define the GroupIds himself */
    public readonly childrenGroupIds = input<number[] | undefined>(undefined);
    /** Force to define the groupId himself */
    public readonly groupId: InputSignalWithTransform<number | undefined, unknown> = input(undefined, { transform: (value: unknown, fallbackValue?: number) => value === undefined ? undefined : numberAttribute(value, fallbackValue) });

    // # Injection
    protected readonly groupService = inject<NavPanelGroupService>(NavPanelGroupService);
    public readonly parent = inject<OpenableComponent | null>(PARENT_OPENABLE);
    // # Inputs
    public readonly _name = input<string>(''); // To debug
    public readonly panelId = input<string | undefined>(undefined);
    protected readonly panelService = inject(PanelRegistry);
    /** Flag the openable as a container */
    public readonly isContainer: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute });
    /** Force open or close  */
    public readonly isExpanded: InputSignalWithTransform<boolean, unknown> = input(false, {
        transform: booleanAttribute,
        alias: 'expanded'
    });

    public readonly isCurrentOpen = computed<boolean>(() => {
        const isExpanded = this.isExpanded();
        if (isExpanded) {
            return isExpanded;
        }
        const isPanelOpen = this.groupService.isPanelOpen(this.groupInfo());
        if (isPanelOpen) {
            return isPanelOpen;
        }
        return false;
    });

    @HostBinding('class.aria-expanded')
    protected get ariaExpanded(): boolean {
        return this.isExpanded();
    }

    // # Signal
    public readonly onAfterViewInit = signal<boolean>(false);
    /** The Child OpenableComponent index themselves in this Array */
    public readonly children = signal<{ child: OpenableComponent; groupInfo: GroupInfo }[]>([]);
    // # Computed
    /** the parentOpenable also flag as a container */
    public readonly parentContainer = computed((): OpenableComponent | undefined => {
        const parentOpenable = this.parent;
        return parentOpenable?.isContainer() ? parentOpenable : undefined;
    });

    // # Properties
    public styleOrigin!: { display: string };

    /** Group Identifier */
    public readonly groupInfo = computed<GroupInfo>(
        () =>
            ({
                panel: this,
                groupId: this.groupId()
            }) as GroupInfo
    );

    /** Compute the list of childrenGroupInfos if it's a container */
    public readonly childrenGroupInfos = computed<GroupInfo[] | undefined>(() => {
        const isContainer = this.isContainer();
        const childrenGroupIds = this.childrenGroupIds();
        if (childrenGroupIds) {
            // The user define the GroupIds himself
            return childrenGroupIds.map(groupId => ({ groupId }) as GroupInfo);
        } else if (isContainer) {
            const children = this.children();
            return children.reduce((r, { child, groupInfo }) => {
                r.push(groupInfo);
                const childGroupInfos = child.childrenGroupInfos();
                if (childGroupInfos) {
                    r.push(...childGroupInfos);
                }
                return r;
            }, [] as GroupInfo[]);
        } else {
            return undefined;
        }
    });

    /** Compute if it's open or close */
    public readonly isChildrenOpen = computed<boolean>(() => {
        const childrenGroupInfos = this.childrenGroupInfos();
        if (childrenGroupInfos) {
            return this.groupService.isPanelOpen(childrenGroupInfos);
        }
        return false;
    });

    public readonly isOpen = computed(() =>
        this.isContainer() ? this.isCurrentOpen() || this.isChildrenOpen() : this.isCurrentOpen()
    );

    public readonly isGroupOpen = computed(() => {
        const isPanelOpen = this.groupService.isPanelOpen(this.groupInfo());
        if (isPanelOpen) {
            return isPanelOpen;
        }
        return false;
    });

    // # Properties
    /** Let the animation take care of the visibility  */
    protected readonly autoHide: boolean = true;
    private _lastPanelId?: string;
    private readonly element = inject<ElementRef<HTMLInputElement>>(ElementRef);
    private readonly renderer = inject(Renderer2);

    public constructor() {
        effect(() => {
            const panelId = this.panelId();
            if (panelId !== this._lastPanelId) {
                if (this._lastPanelId) {
                    this.panelService.unregister(this._lastPanelId);
                }
                if (panelId) {
                    this.panelService.register(panelId, this);
                }
            }
            this._lastPanelId = panelId;
        });
        // Show or Hide
        effect(() => {
            if (this.onAfterViewInit()) {
                if (this.autoHide) {
                    this.renderer.setStyle(
                        this.element.nativeElement,
                        'display',
                        this.isOpen() ? this.styleOrigin.display : 'none'
                    );
                }
            }
        });

        // Reference current component in parent
        let lastGroupInfo: GroupInfo;
        effect(() => {
            const parent = this.parentContainer();
            if (parent) {
                const groupInfo = this.groupInfo();
                if (lastGroupInfo !== groupInfo) {
                    parent.children.update(v => {
                        const ref = v.find(o => o.child === this);
                        if (ref) {
                            ref.groupInfo = groupInfo;
                            return clone(v);
                        } else {
                            return [
                                ...v,
                                { child: this, groupInfo }
                            ];
                        }
                    });
                    lastGroupInfo = groupInfo;
                }
            }
        });
    }

    // # LifeCycle

    public ngAfterViewInit(): void {
        this.styleOrigin = pick(window.getComputedStyle(this.element.nativeElement), 'display');
        this.onAfterViewInit.set(true);
    }

    public ngOnDestroy(): void {
        // remove his reference in parent component
        this.parentContainer()?.children.update(v => v.filter(o => o.child !== this));
        this.panelService.unregister(this);
    }

    // # Actions

    public close(): void {
        this.groupService.closePanel(this.groupInfo());
    }

    public open(): void {
        this.groupService.openPanel(this.groupInfo());
    }
}
