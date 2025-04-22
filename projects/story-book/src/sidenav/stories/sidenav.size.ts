import { StoryObj } from '@storybook/angular';

import { NgxSidenavComponentType, sidenavSizeArgs } from '../args/sidenav.args';
import { sidenavSimpleRender } from '../renders/sidenav-simple.render';

export const sidenavSize: StoryObj<NgxSidenavComponentType> = {
    parameters: {
        docs: {
            description: {
                story: 'La directive `[navSize]` ermet de spécifier les tailles standard des sidebars utilisées dans les applications du HUG.'
            }
        }
    },
    render: sidenavSimpleRender({
        location: [],
        theme: [],
        navSize: [],
        buttons: `
@switch(navButtonType) {
    @case ("nav-button") {
        <button nav-button
            routerLink="/item1"
            routerLinkActive="ngx-nav-state-selected"
            [routerLinkActiveOptions]="{exact: false}"
            navAction="open"
            [navActionContainer]="panelRight"
            [navActionContent]="templates.contentAccordion1()">
            <mat-icon>filter_drama</mat-icon> Cloud
        </button>
        <button nav-button
            routerLink="/item2"
            routerLinkActive="active-link"
            [routerLinkActiveOptions]="{exact: false}"
            navAction="open"
            [navActionContainer]="panelRight"
            [navActionContent]="templates.contentAccordion2()">
            <mat-icon>palette</mat-icon> Palette
        </button>
    }
    @case ("nav-icon-button") {
        <button nav-icon-button
            routerLink="/item1"
            routerLinkActive="ngx-nav-state-selected"
            [routerLinkActiveOptions]="{exact: false}"
            navAction="open"
            [navActionContainer]="panelRight"
            [navActionContent]="templates.contentAccordion1()"
            matTooltip="Cloud">
            <mat-icon>filter_drama</mat-icon>
        </button>
        <button nav-icon-button
            routerLink="/item2"
            routerLinkActive="active-link"
            [routerLinkActiveOptions]="{exact: false}"
            navAction="open"
            [navActionContainer]="panelRight"
            [navActionContent]="templates.contentAccordion2()"
            matTooltip="Palette">
            <mat-icon>palette</mat-icon>
        </button>
    }
}
`
    }),
    ...sidenavSizeArgs()
};
