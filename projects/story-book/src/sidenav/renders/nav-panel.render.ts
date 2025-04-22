import { PanelTheme, PanelType } from '@hug/ngx-sidenav';
import { StoryObj } from '@storybook/angular';
import { ICollection } from '@storybook/angular/dist/client/types';
import { first, includes, isArray } from 'lodash-es';

import { sidebarEnums } from '../enums/sidebar.enums';
import { renderTools } from './render.tools';
import { sidenavLayout } from './templates/sidenav.layout.template';


export interface PanelTemplateArgs {
    props?: ICollection;
    panel?: string;
    container?: string;
    expanded?: boolean | [string] | [];
    isContainer?: boolean | [string] | [];
    groupId?: number | [string] | [];
    childrenGroupIds?: string | [string] | [];
    panelType?: PanelType | [string] | [];
    panelTheme?: PanelTheme | [string] | [];
}

export const navPanelRender = (renderArgs: PanelTemplateArgs = {}): StoryObj['render'] => args => {
    const {
        props,
        panel,
        container,
        expanded,
        isContainer,
        groupId,
        childrenGroupIds,
        panelType,
        panelTheme
    } = renderArgs;

    const classLocation = ((): string | undefined => {
        if (isArray(panelType)) {
            return `locationClass(${first(panelType) ?? 'panelType'})`;
        } else if (panelType) {
            return `locationClass('${panelType}')`;
        } else {
            return '\'\'';
        }
    })();

    const { property } = renderTools;
    return ({
        props: {
            ...args,
            ...props,
            ...sidebarEnums,
            includes,
            locationClass: (v: PanelType) =>
                v.includes('open-right')
                    ? 'location-left'
                    : 'location-right'
        },
        template: `
    <section class="sidenav nav-panel" [class]="pageSize + ' ' + ${classLocation}">
        ${sidenavLayout(`
        ${panel ?? `<ngx-nav-panel
                        ${property('expanded', expanded)}
                        ${property('isContainer', isContainer)}
                        ${property('groupId', groupId)}
                        ${property('childrenGroupIds', childrenGroupIds)}
                        ${property('panelType', panelType)}
                        ${property('panelTheme', panelTheme)}>
            ${container ?? '<ng-container [ngTemplateOutlet]="templates.getRef(content)"></ng-container>'}
        </ngx-nav-panel>`}`)}
    </section>

    <!-- # Templates -->
    <content-templates #templates></content-templates>`
    });
};
