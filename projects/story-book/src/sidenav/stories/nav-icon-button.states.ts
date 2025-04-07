import { StoryObj } from '@storybook/angular';

import { NavButtonComponentArgs, navButtonDirectiveArgs } from '../args/nav-button.args';
import { sidebarEnums } from '../enums/sidebar.enums';
import { sidenavParts } from '../templates/sidenav.horizontal.content.template';

const templateDefaultDirective = (): string => `
            <button nav-icon-button [state]="NavItemState.ENABLED" matTooltip="enabled">
                <mat-icon>menu_open</mat-icon>
            </button>
            <button nav-icon-button [state]="NavItemState.DISABLED" matTooltip="disabled">
                <mat-icon>menu_open</mat-icon>
            </button>
            <button nav-icon-button [state]="NavItemState.PRESSED" matTooltip="pressed">
                <mat-icon>menu_open</mat-icon>
            </button>
            <button nav-icon-button [state]="NavItemState.FOCUSED" matTooltip="focused">
                <mat-icon>menu_open</mat-icon>
            </button>
            <button nav-icon-button [state]="NavItemState.HOVERED" matTooltip="hovered">
                <mat-icon>menu_open</mat-icon>
            </button>`;

const templateFillDirective = (): string => `
            <button nav-icon-button [state]="NavItemState.ENABLED" [style]="NavItemStyle.FILL" matTooltip="enabled">
                <mat-icon>menu_open</mat-icon>
            </button>
            <button nav-icon-button [state]="NavItemState.DISABLED" [style]="NavItemStyle.FILL" matTooltip="disabled">
                <mat-icon>menu_open</mat-icon>
            </button>
            <button nav-icon-button [state]="NavItemState.PRESSED" [style]="NavItemStyle.FILL" matTooltip="pressed">
                <mat-icon>menu_open</mat-icon>
            </button>
            <button nav-icon-button [state]="NavItemState.FOCUSED" [style]="NavItemStyle.FILL" matTooltip="focused">
                <mat-icon>menu_open</mat-icon>
            </button>
            <button nav-icon-button [state]="NavItemState.HOVERED" [style]="NavItemStyle.FILL" matTooltip="hovered">
                <mat-icon>menu_open</mat-icon>
            </button>`;

const templateDefaultComponent = (): string => `
            <ngx-nav-icon-button [state]="NavItemState.ENABLED" matTooltip="enabled">
                <mat-icon>menu_open</mat-icon>
            </ngx-nav-icon-button>
            <ngx-nav-icon-button [state]="NavItemState.DISABLED" matTooltip="disabled">
                <mat-icon>menu_open</mat-icon>
            </ngx-nav-icon-button>
            <ngx-nav-icon-button [state]="NavItemState.PRESSED" matTooltip="pressed">
                <mat-icon>menu_open</mat-icon>
            </ngx-nav-icon-button>
            <ngx-nav-icon-button [state]="NavItemState.FOCUSED" matTooltip="focused">
                <mat-icon>menu_open</mat-icon>
            </ngx-nav-icon-button>
            <ngx-nav-icon-button [state]="NavItemState.HOVERED" matTooltip="hovered">
                <mat-icon>menu_open</mat-icon>
            </ngx-nav-icon-button>`;

const templateFillComponent = (): string => `
            <ngx-nav-icon-button [state]="NavItemState.ENABLED" [style]="NavItemStyle.FILL" matTooltip="enabled">
                <mat-icon>menu_open</mat-icon>
            </ngx-nav-icon-button>
            <ngx-nav-icon-button [state]="NavItemState.DISABLED" [style]="NavItemStyle.FILL" matTooltip="disabled">
                <mat-icon>menu_open</mat-icon>
            </ngx-nav-icon-button>
            <ngx-nav-icon-button [state]="NavItemState.PRESSED" [style]="NavItemStyle.FILL" matTooltip="pressed">
                <mat-icon>menu_open</mat-icon>
            </ngx-nav-icon-button>
            <ngx-nav-icon-button [state]="NavItemState.FOCUSED" [style]="NavItemStyle.FILL" matTooltip="focused">
                <mat-icon>menu_open</mat-icon>
            </ngx-nav-icon-button>
            <ngx-nav-icon-button [state]="NavItemState.HOVERED" [style]="NavItemStyle.FILL" matTooltip="hovered">
                <mat-icon>menu_open</mat-icon>
            </ngx-nav-icon-button>`;

export const navIconButtonStates: StoryObj<NavButtonComponentArgs> = {
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
<section class="sidenav nav-icon-button">
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
    }),
    ...navButtonDirectiveArgs
};
