import { PanelType } from '@hug/ngx-sidenav';
import { StoryObj } from '@storybook/angular';
import { includes } from 'lodash-es';

import { navPanelArgs, NgxNavPanelComponentType } from '../args/nav-panel.args';
import { sidebarEnums } from '../enums/sidebar.enums';
import { getDynamicContent, getDynamicContentTemplates } from '../templates/sidenav.content-dynamic.template';
import { sidenavLayout } from '../templates/sidenav.layout.template';

export const navPanelTwoPanel: StoryObj<NgxNavPanelComponentType> = {
    parameters: {
        docs: {
            description: {
                story: 'This story demonstrates the standard usage of `NgxNavIconButtonComponent`.'
            }
        }
    },
    render: args => ({
        props: {
            ...args,
            ...sidebarEnums,
            includes,
            locationClass: (panelType: PanelType) =>
                includes(
                    [
                        'open-right',
                        'overlay-open-right',
                        'fixed-open-right'
                    ],
                    panelType
                )
                    ? 'location-left'
                    : 'location-right',
            needGroup: (panelType: PanelType) =>
                includes(
                    [
                        'overlay-open-right',
                        'overlay-open-left',
                        'fixed-open-right',
                        'fixed-open-left'
                    ],
                    panelType
                )
        },
        template: `
<section class="sidenav nav-panel min600x400" [class]="locationClass(panelType)">
    ${sidenavLayout(`
        @if(needGroup(panelType)) {
            <!-- # Recipe : Group the panel you want to see inside a parent panel for OVERLAY and FIXED -->
            <ngx-nav-panel-group [expanded]="expanded" [panelType]="panelType">
                <ngx-nav-panel [expanded]="expanded" [panelTheme]="panelTheme">
                    ${getDynamicContent('content')}
                </ngx-nav-panel>
                <ngx-nav-panel [expanded]="expanded" [panelTheme]="panelTheme">
                    <h1>Panel 2</h1>
                    Lorem ipsum dolor sit amet...
                </ngx-nav-panel>
            </ngx-nav-panel-group>
        } @else {
            <ngx-nav-panel [expanded]="expanded" [panelType]="panelType" [panelTheme]="panelTheme">
                ${getDynamicContent('content')}
            </ngx-nav-panel>
            <ngx-nav-panel [expanded]="expanded" [panelType]="panelType" [panelTheme]="panelTheme">
                <h1>Panel 2</h1>
                Lorem ipsum dolor sit amet...
            </ngx-nav-panel>
        }
    `)}
    <!-- # Templates -->
    ${getDynamicContentTemplates()}
</section>`
    }),
    ...navPanelArgs
};
