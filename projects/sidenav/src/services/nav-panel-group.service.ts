/* eslint-disable @typescript-eslint/member-ordering, @typescript-eslint/naming-convention */
import { Injectable, signal, TemplateRef } from '@angular/core';
import { every, flatten, isArray, pick, reduce } from 'lodash-es';

import { OpenableComponent } from '../components';
import { GroupInfo, PanelContent, PanelContentGroup, PanelOptions, PartialPanelContent } from '../models';

let IDS_GROUP = -1;

@Injectable()
export class NavPanelGroupService<T extends OpenableComponent = OpenableComponent> {
    /** register of Groups currently open */
    public readonly openGroups = signal<PanelContentGroup[]>([]);

    /**
     * Retrieves the panel content associated with the given group parameters.
     *
     * @returns The panel content related to the provided group, if found.
     * @param params
     */
    public getPanelContent(params: GroupInfo<T>): TemplateRef<unknown>[] {
        return reduce(
            flatten(this.openGroups().map(g => g.panelContent)),
            (r, v: PanelContent) => {
                if (v.isPanelEqual(params) && v.content) {
                    r.push(v.content);
                }
                return r;
            },
            [] as TemplateRef<unknown>[]
        );
    }

    /**
     * Retrieves the hover-based panel group associated with the given group information.
     *
     * @returns The matching hover panel group if found, otherwise undefined.
     * @param params
     */
    public getHoverPanel(params: GroupInfo<T>): PanelContentGroup | undefined {
        return this.openGroups()
            .filter(v => v.options.isHover)
            .find(group => group.panelContent.find(g => g.isPanelEqual(params)));
    }

    /**
     * On mouse leave, dispatch an action if the panel was opened via hover.
     *
     * @param param - The group information used to identify the resource.
     */
    public closeHoverPanel(param: GroupInfo<T>): void {
        const group: PanelContentGroup | undefined = this.getHoverPanel(param);
        if (group) {
            this.openGroups.update(groups => groups.filter(v => v !== group));
        }
    }

    /**
     * Closes all hover panel (in group -1).
     *
     */
    public closeAllHoverPanel(): void {
        this.openGroups.update(v => v.filter(group => group.id !== -1));
    }

    /**
     * Opens one or multiple panels associated with the given group information.
     *
     * @param pParams - The group information used to identify the resource(s).
     */
    public openPanel(pParams: GroupInfo<T> | GroupInfo<T>[]): void {
        const params = isArray(pParams) ? pParams : [
            pParams
        ];
        // Resolve existing group ang group corresponding parameters
        const groupSelection = this.resolveExistingGroup(params);
        // close PanelContent out of the list
        const groups = this.removePanelContentInGroupOutsideSelection(groupSelection.groupList);
        // open new PanelContents
        this.addPanelContentInsideSelection(groups, groupSelection.notExist, new PanelOptions({ isHover: false }));
        // remove empty group only at the end if they are remain empty
        this.removeEmptyGroup(groups);
    }

    /**
     * Opens one or multiple content in a panel associated with the given group information,
     * and sets the `isHover` option to allow the panel to be selected when the mouse leaves it.
     *
     * @param pParams - The group information used to identify the resource(s).
     */
    public overPanel(pParams: GroupInfo<T> | GroupInfo<T>[]): void {
        const params = (isArray(pParams) ? pParams : [pParams]).map(v =>
            ({ ...v, groupId: v.groupId ?? -1 }));
        // Resolve existing group ang group corresponding parameters
        const groupSelection = this.resolveExistingGroup(params);
        // close PanelContent out of the list
        const groups = this.removePanelContentInGroupOutsideSelection(groupSelection.groupList);
        // open new PanelContents
        this.addPanelContentInsideSelection(groups, groupSelection.notExist, new PanelOptions({ isHover: true }));
        // remove empty group only at the end if they are remain empty
        this.removeEmptyGroup(groups);
    }

    /**
     * Closes one or multiple panels associated with the given group information.
     *
     * @param pParams - The group information used to identify the resource(s).
     */
    public closePanel(pParams: GroupInfo<T> | GroupInfo<T>[]): void {
        const params = isArray(pParams) ? pParams : [
            pParams
        ];
        // Resolve existing group ang group corresponding parameters
        const groupSelection = this.resolveExistingGroup(params);
        // close PanelContent in of the list
        console.log('groupList', groupSelection.groupList, groupSelection);
        const groups = this.removePanelContentInGroupInsideSelection(groupSelection.groupList);
        // remove empty group only at the end if they are remain empty
        this.removeEmptyGroup(groups);
    }

    /**
     * Closes one or multiple panel groups associated with the given group information.
     *
     * @param pParams - The group information used to identify the resource(s).
     */
    public closeGroup(pParams: GroupInfo<T> | GroupInfo<T>[]): void {
        const params = isArray(pParams) ? pParams : [
            pParams
        ];
        // Resolve existing group ang group corresponding parameters
        const groupParams = this.resolveExistingGroup(params);
        // close PanelContent in of the list
        const groups = this.removePanelContentInGroupInsideSelection(groupParams.groupList);
        // remove empty group only at the end if they are remain empty
        this.removeEmptyGroup(groups);
    }

    /**
     * Closes all currently open panel groups.
     */
    public closeAllGroup(): void {
        this.openGroups.set([]);
    }

    /**
     * Checks whether the panel associated with the given 'Panel' is currently open.
     *
     * @returns {boolean} True if the corresponding resource is open, false otherwise.
     * @param params - The group information used to identify the resource(s).
     * @param compareType
     */
    public isPanelOpen(params: GroupInfo<T> | GroupInfo<T>[], compareType?: 'every' | 'one'): boolean {
        return this._isOpen(params, compareType, PanelContent.isPanelEqual);
    }

    /**
     * Checks if the given 'Panel + Content' is open.
     *
     * @returns True if open, false otherwise.
     * @param params - The group information used to identify the resource(s).
     * @param compareType
     */
    public isOpen(params: GroupInfo<T> | GroupInfo<T>[], compareType?: 'every' | 'one'): boolean {
        return this._isOpen(params, compareType, PanelContent.isEqual);
    }

    private _isOpen(
        params: GroupInfo<T> | GroupInfo<T>[],
        compareType: 'every' | 'one' | undefined,
        compare: (a: PanelContent, b: PartialPanelContent) => boolean
    ): boolean {
        if (isArray(params)) {
            if (compareType === 'every') {
                return every(params.map(v => this._isOpen(v, compareType, compare)));
            } else {
                return !!params.find(v => this._isOpen(v, compareType, compare));
            }
        } else {
            const groups = this.openGroups();
            if (params.groupId) {
                const group = groups.find(v => v.id === params.groupId);
                return !!group?.panelContent.find(v => compare(v, params));
            } else {
                return !!groups.find(g => g.panelContent.find(v => compare(v, params)));
            }
        }
    }

    /**
     * Checks if the given group is open.
     *
     * @returns True if open, false otherwise.
     * @param param - The group information used to identify the resource(s).
     */
    public getGroup(param: GroupInfo<T>): PanelContentGroup | undefined {
        return this._getGroup(param, PanelContent.isEqual);
    }

    /**
     * Checks if the given group is open. (test only panel equality)
     *
     * @returns True if open, false otherwise.
     * @param param - The group information used to identify the resource(s).
     */

    public getPanelGroup(param: GroupInfo<T>): PanelContentGroup | undefined {
        return this._getGroup(param, PanelContent.isPanelEqual);
    }

    /**
     * Checks if the given group is open.
     *
     * @returns True if open, false otherwise.
     * @param param - The group information used to identify the resource(s).
     * @param compare
     */

    private _getGroup(param: GroupInfo<T>, compare: (a: PanelContent, b: PartialPanelContent) => boolean): PanelContentGroup | undefined {
        const groups = this.openGroups();
        return param.groupId ?
            groups.find(v => v.id === param.groupId) :
            groups.find(g => g.panelContent.find(v => compare(v, param)));
    }

    // # Register
    private registerPanelGroup(groups: PanelContentGroup[], param: GroupInfo<T>, options: PanelOptions): PanelContentGroup {
        let group: PanelContentGroup | undefined =
            param.groupId === undefined
                ? groups.find(v => v.panelContent.find(p => p.isEqual(param)))
                : groups.find(v => v.id === param.groupId);
        if (!group) {
            const groupId = param.groupId ?? --IDS_GROUP;
            group = new PanelContentGroup(groupId, options);
            groups.push(group);
        }
        if (group.options.isHover !== options.isHover) {
            // Click has priority over mouseover (rare case)
            group.options.isHover = false;
        }
        group.panelContent.push(new PanelContent(param.panel, param.content));
        return group;
    }

    // # Tools
    private findPanelContent(param: GroupInfo<T>, group: PanelContentGroup | undefined): PanelContent | undefined {
        if (!group) {
            return undefined;
        }
        return group.panelContent.find(v => v.isEqual(param));
    }

    private findGroup(param: GroupInfo<T>): PanelContentGroup | undefined {
        return param.groupId === undefined
            ? this.openGroups().find(group => group.panelContent.find(v => v.isEqual(param)))
            : this.openGroups().find(group => group.id === param.groupId);
    }

    /**
     * Resolve existing group ang group corresponding parameters
     */
    private resolveExistingGroup(groupInfos: GroupInfo<T>[]): {
        groupList: { group: PanelContentGroup; params: GroupInfo<T>[] }[];
        notExist: GroupInfo<T>[];
    } {
        return pick(
            reduce(
                groupInfos,
                (r, param) => {
                    const group = this.findGroup(param);
                    const panelContent = this.findPanelContent(param, group);
                    if (group) {
                        let slot = r.groupRecord[group.id];
                        if (!slot) {
                            slot = {
                                group,
                                params: [
                                    param
                                ]
                            };
                            r.groupList.push(slot);
                            r.groupRecord[group.id] = slot;
                        } else {
                            slot.params.push(param);
                        }
                    }
                    if (!panelContent) {
                        r.notExist.push(param);
                    }
                    return r;
                },
                {
                    groupList: [],
                    notExist: [],
                    groupRecord: {}
                } as ReturnType<typeof this.resolveExistingGroup> & {
                    groupRecord: Record<number, { group: PanelContentGroup; params: GroupInfo<T>[] }>;
                }
            ),
            [
                'groupList',
                'notExist'
            ]
        );
    }

    /**
     * Close PanelContent out of the list
     */
    private removePanelContentInGroupSelection(
        list: ReturnType<typeof this.resolveExistingGroup>['groupList'],
        insideTheGroupSelection = true
    ): PanelContentGroup[] {
        return reduce(
            this.openGroups(),
            (r, group) => {
                const slot = list.find(v => v.group?.id === group.id);
                if (slot) {
                    slot.group.options.isFirstOpen = false;
                    const panelContent = group.panelContent.filter(v =>
                        slot.params.find(param => (insideTheGroupSelection ? !v.isEqual(param) : v.isEqual(param)))
                    ); // remove prevent panel open
                    if (panelContent.length !== group.panelContent.length) {
                        group.panelContent = panelContent;
                    }
                    if (panelContent.length) {
                        r.push(group);
                    }
                } else {
                    r.push(group);
                }
                return r;
            },
            [] as PanelContentGroup[]
        );
    }

    /**
     * Close PanelContent out of the list
     */
    private removeEmptyGroup(groups: PanelContentGroup[]): void {
        groups = groups.filter(group => group.panelContent.length);
        this.openGroups.set(groups);
    }

    private removePanelContentInGroupOutsideSelection(
        groupList: ReturnType<typeof this.resolveExistingGroup>['groupList']
    ): PanelContentGroup[] {
        return this.removePanelContentInGroupSelection(groupList, false);
    }

    private removePanelContentInGroupInsideSelection(
        groupList: ReturnType<typeof this.resolveExistingGroup>['groupList']
    ): PanelContentGroup[] {
        return this.removePanelContentInGroupSelection(groupList, true);
    }

    private addPanelContentInsideSelection(
        groups: PanelContentGroup[],
        params: ReturnType<typeof this.resolveExistingGroup>['notExist'],
        options: PanelOptions
    ): void {
        params.forEach(groupInfo => this.registerPanelGroup(groups, groupInfo, options));
    }
}
