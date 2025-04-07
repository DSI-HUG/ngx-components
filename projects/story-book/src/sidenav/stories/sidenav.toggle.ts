import { StoryObj } from '@storybook/angular';

import { NgxSidenavComponentType, sidenavArgs } from '../args/sidenav.args';
import { sidebarEnums } from '../enums/sidebar.enums';
import { sidenavTemplate } from '../templates/sidenav.template';

export const sidenavToggle: StoryObj<NgxSidenavComponentType> = {
    parameters: {
        docs: {
            description: {
                story: 'This story demonstrates the standard usage of `SidenavComponent`.'
            }
        }
    },
    render: args => ({
        props: {
            ...args,
            ...sidebarEnums
        },
        template: sidenavTemplate({
            buttons: `<button nav-button
                        routerLink="/item1"
                        routerLinkActive="ngx-nav-state-selected"
                        [routerLinkActiveOptions]="{exact: false}"
                        [navPanel]="panelOpenLeft"
                        [navPanelContent]="contentAccordion1"
                        [navAction]="NavAction.TOGGLE">
                        <mat-icon>toggle_on</mat-icon> Toggle 1
                    </button>
                    <button nav-button
                        routerLink="/item2"
                        routerLinkActive="active-link"
                        [routerLinkActiveOptions]="{exact: false}"
                        [navPanel]="panelFixedOpenLeft"
                        [navPanelContent]="contentAccordion2"
                        [navAction]="NavAction.TOGGLE">
                        <mat-icon>toggle_on</mat-icon> Toggle 2
                    </button>`,
            panels: `<ngx-nav-panel #panelOpenLeft [panelType]="PanelType.OPEN_LEFT"></ngx-nav-panel>
                    <ngx-nav-panel #panelFixedOpenLeft [panelType]="PanelType.FIXED_OPEN_LEFT"></ngx-nav-panel>`
        })
    }),
    ...sidenavArgs
};
