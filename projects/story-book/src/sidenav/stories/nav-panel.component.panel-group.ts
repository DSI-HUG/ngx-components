import { PanelType } from '@hug/ngx-sidenav';
import { StoryObj } from '@storybook/angular';

import { nav2PanelArgs, NavPanelComponentType } from '../args/nav-panel.args';
import { navPanelRender } from '../renders/nav-panel.render';

export const navPanelComponentPanelGroup: StoryObj<NavPanelComponentType> = {
    parameters: {
        docs: {
            description: {
                story: `Le composant \`ngx-nav-panel-group\` sert de conteneur (wrapper) pour regrouper plusieurs \`sidebar\`.
Le style est appliqué sur le \`nav-panel-group\`, et les sidebars sont affichées horizontalement.`
            }
        }
    },
    render: navPanelRender(
        {
            expanded: [],
            panelType: [],
            props: {
                subPanelType: (v: PanelType) =>
                    v.includes('open-right')
                        ? 'open-right'
                        : 'open-left'
            },
            panel: `
                <!-- # Recipe : Group the panel you want to see inside a parent panel for OVERLAY and FIXED -->
                <ngx-nav-panel-group [expanded]="expanded" [panelType]="panelType">
                    <ngx-nav-panel [expanded]="expanded" [panelType]="subPanelType(panelType)" panelTheme="m3">
                        <ng-container [ngTemplateOutlet]="templates.getRef(content)"></ng-container>
                    </ngx-nav-panel>
                    <ngx-nav-panel [expanded]="expanded" [panelType]="subPanelType(panelType)" panelTheme="m3">
                        <h1>Panel 2</h1>
                        Lorem ipsum dolor sit amet...
                    </ngx-nav-panel>
                </ngx-nav-panel-group>
            `
        }
    ),
    ...nav2PanelArgs
};
