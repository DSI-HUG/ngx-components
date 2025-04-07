import { StoryObj } from '@storybook/angular';

import { NavButtonComponentArgs } from '../args/nav-button.args';
import { sidebarEnums } from '../enums/sidebar.enums';
import { sidenavParts } from '../templates/sidenav.horizontal.content.template';

const templateDefaultDirective = (): string => `
            <button nav-button [state]="NavItemState.ENABLED">
                <mat-icon>menu_open</mat-icon> enabled
            </button>
            <button nav-button [state]="NavItemState.DISABLED">
                <mat-icon>menu_open</mat-icon> disabled
            </button>
            <button nav-button [state]="NavItemState.PRESSED">
                <mat-icon>menu_open</mat-icon> pressed
            </button>
            <button nav-button [state]="NavItemState.FOCUSED">
                <mat-icon>menu_open</mat-icon> focused
            </button>
            <button nav-button [state]="NavItemState.HOVERED">
                <mat-icon>menu_open</mat-icon> hovered
            </button>`;

const templateFillDirective = (): string => `
            <button nav-button [state]="NavItemState.ENABLED" [style]="NavItemStyle.FILL">
                <mat-icon>menu_open</mat-icon> enabled
            </button>
            <button nav-button [state]="NavItemState.DISABLED" [style]="NavItemStyle.FILL">
                <mat-icon>menu_open</mat-icon> disabled
            </button>
            <button nav-button [state]="NavItemState.PRESSED" [style]="NavItemStyle.FILL">
                <mat-icon>menu_open</mat-icon> pressed
            </button>
            <button nav-button [state]="NavItemState.FOCUSED" [style]="NavItemStyle.FILL">
                <mat-icon>menu_open</mat-icon> focused
            </button>
            <button nav-button [state]="NavItemState.HOVERED" [style]="NavItemStyle.FILL">
                <mat-icon>menu_open</mat-icon> hovered
            </button>`;

const templateDefaultComponent = (): string => `
            <ngx-nav-button [state]="NavItemState.ENABLED">
                <mat-icon>menu_open</mat-icon> enabled
            </ngx-nav-button>
            <ngx-nav-button [state]="NavItemState.DISABLED">
                <mat-icon>menu_open</mat-icon> disabled
            </ngx-nav-button>
            <ngx-nav-button [state]="NavItemState.PRESSED">
                <mat-icon>menu_open</mat-icon> pressed
            </ngx-nav-button>
            <ngx-nav-button [state]="NavItemState.FOCUSED">
                <mat-icon>menu_open</mat-icon> focused
            </ngx-nav-button>
            <ngx-nav-button [state]="NavItemState.HOVERED">
                <mat-icon>menu_open</mat-icon> hovered
            </ngx-nav-button>`;

const templateFillComponent = (): string => `
            <ngx-nav-button [state]="NavItemState.ENABLED" [style]="NavItemStyle.FILL">
                <mat-icon>menu_open</mat-icon> enabled
            </ngx-nav-button>
            <ngx-nav-button [state]="NavItemState.DISABLED" [style]="NavItemStyle.FILL">
                <mat-icon>menu_open</mat-icon> disabled
            </ngx-nav-button>
            <ngx-nav-button [state]="NavItemState.PRESSED" [style]="NavItemStyle.FILL">
                <mat-icon>menu_open</mat-icon> pressed
            </ngx-nav-button>
            <ngx-nav-button [state]="NavItemState.FOCUSED" [style]="NavItemStyle.FILL">
                <mat-icon>menu_open</mat-icon> focused
            </ngx-nav-button>
            <ngx-nav-button [state]="NavItemState.HOVERED" [style]="NavItemStyle.FILL">
                <mat-icon>menu_open</mat-icon> hovered
            </ngx-nav-button>`;

export const navButtonStates: StoryObj<NavButtonComponentArgs> = {
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
            ...sidebarEnums
        },
        template: `
<section class="sidenav nav-button">
    ${sidenavParts(
            [
                {
                    partTitle: 'Directive',
                    content: [
                        {
                            contentTitle: 'Default',
                            value: `<ngx-sidenav>
                            ${templateDefaultDirective()}
                        </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Fill',
                            value: `<ngx-sidenav>
                            ${templateFillDirective()}
                        </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Light',
                            value: `<ngx-sidenav [theme]="SidebarTheme.LIGHT">
                            ${templateDefaultDirective()}
                        </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Light Fill',
                            value: `<ngx-sidenav [theme]="SidebarTheme.LIGHT">
                            ${templateFillDirective()}
                        </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Dark',
                            value: `<ngx-sidenav [theme]="SidebarTheme.DARK">
                            ${templateDefaultDirective()}
                        </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Dark Fill',
                            value: `<ngx-sidenav [theme]="SidebarTheme.DARK">
                            ${templateFillDirective()}
                        </ngx-sidenav>`
                        }
                    ]
                },
                {
                    partTitle: 'Component',
                    content: [
                        {
                            contentTitle: 'Default',
                            value: `<ngx-sidenav>
                            ${templateDefaultComponent()}
                        </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Fill',
                            value: `<ngx-sidenav>
                            ${templateFillComponent()}
                        </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Light Default',
                            value: `<ngx-sidenav [theme]="SidebarTheme.LIGHT">
                            ${templateDefaultComponent()}
                        </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Light',
                            value: `<ngx-sidenav  [theme]="SidebarTheme.LIGHT">
                            ${templateFillComponent()}
                        </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Dark Default',
                            value: `<ngx-sidenav [theme]="SidebarTheme.DARK">
                            ${templateDefaultComponent()}
                        </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Dark',
                            value: `<ngx-sidenav [theme]="SidebarTheme.DARK">
                            ${templateFillComponent()}
                        </ngx-sidenav>`
                        }
                    ]
                }
            ],
            'vertical'
        )}
</section>`
    })
};
