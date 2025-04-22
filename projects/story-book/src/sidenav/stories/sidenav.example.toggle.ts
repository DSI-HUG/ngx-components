import { StoryObj } from '@storybook/angular';

import { NgxSidenavComponentType } from '../args/sidenav.args';
import { sidenavSimpleRender } from '../renders/sidenav-simple.render';

export const sidenavExampleToggle: StoryObj<NgxSidenavComponentType> = {
    parameters: {
        docs: {
            description: {
                story: 'Dans cet exemple, les actions sont déclenchées par un **clic**, avec un comportement de type *toggle* (activation/désactivation).'
            }
        }
    },
    render: sidenavSimpleRender({
        buttons: `<button nav-button
                    routerLink="/item1"
                    routerLinkActive="ngx-nav-state-selected"
                    [routerLinkActiveOptions]="{exact: false}"
                    navAction="toggle"
                    [navActionContainer]="panelOpenLeft"
                    [navActionContent]="templates.contentAccordion1()">
                    <mat-icon>toggle_on</mat-icon> Toggle 1
                </button>
                <button nav-button
                    routerLink="/item2"
                    routerLinkActive="active-link"
                    [routerLinkActiveOptions]="{exact: false}"
                    navAction="toggle"
                    [navActionContainer]="panelFixedOpenLeft"
                    [navActionContent]="templates.contentAccordion2()">
                    <mat-icon>toggle_on</mat-icon> Toggle 2
                </button>`,
        panels: `<ngx-nav-panel #panelOpenLeft panelType="open-left"></ngx-nav-panel>
                <ngx-nav-panel #panelFixedOpenLeft panelType="open-left-fixed"></ngx-nav-panel>`
    })
};
