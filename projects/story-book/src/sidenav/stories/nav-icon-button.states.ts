import { StoryObj } from '@storybook/angular';

import { NavButtonComponentArgs, navButtonDirectiveArgs } from '../args/nav-button.args';
import { sidebarEnums } from '../enums/sidebar.enums';
import { sidenavParts } from '../templates/sidenav.horizontal.content.template';

const templateDefaultDirective = (): string => `
            <button nav-icon-button state="enabled" matTooltip="enabled">
                <mat-icon>menu_open</mat-icon>
            </button>
            <button nav-icon-button state="disabled" matTooltip="disabled">
                <mat-icon>menu_open</mat-icon>
            </button>
            <button nav-icon-button state="pressed" matTooltip="pressed">
                <mat-icon>menu_open</mat-icon>
            </button>
            <button nav-icon-button state="focused" matTooltip="focused">
                <mat-icon>menu_open</mat-icon>
            </button>
            <button nav-icon-button state="hovered" matTooltip="hovered">
                <mat-icon>menu_open</mat-icon>
            </button>`;

const templateFillDirective = (): string => `
            <button nav-icon-button state="enabled" navItemStyle="fill" matTooltip="enabled">
                <mat-icon>menu_open</mat-icon>
            </button>
            <button nav-icon-button state="disabled" navItemStyle="fill" matTooltip="disabled">
                <mat-icon>menu_open</mat-icon>
            </button>
            <button nav-icon-button state="pressed" navItemStyle="fill" matTooltip="pressed">
                <mat-icon>menu_open</mat-icon>
            </button>
            <button nav-icon-button state="focused" navItemStyle="fill" matTooltip="focused">
                <mat-icon>menu_open</mat-icon>
            </button>
            <button nav-icon-button state="hovered" navItemStyle="fill" matTooltip="hovered">
                <mat-icon>menu_open</mat-icon>
            </button>`;

const templateDefaultComponent = (): string => `
            <ngx-nav-icon-button state="enabled" matTooltip="enabled">
                <mat-icon>menu_open</mat-icon>
            </ngx-nav-icon-button>
            <ngx-nav-icon-button state="disabled" matTooltip="disabled">
                <mat-icon>menu_open</mat-icon>
            </ngx-nav-icon-button>
            <ngx-nav-icon-button state="pressed" matTooltip="pressed">
                <mat-icon>menu_open</mat-icon>
            </ngx-nav-icon-button>
            <ngx-nav-icon-button state="focused" matTooltip="focused">
                <mat-icon>menu_open</mat-icon>
            </ngx-nav-icon-button>
            <ngx-nav-icon-button state="hovered" matTooltip="hovered">
                <mat-icon>menu_open</mat-icon>
            </ngx-nav-icon-button>`;

const templateFillComponent = (): string => `
            <ngx-nav-icon-button state="enabled" navItemStyle="fill" matTooltip="enabled">
                <mat-icon>menu_open</mat-icon>
            </ngx-nav-icon-button>
            <ngx-nav-icon-button state="disabled" navItemStyle="fill" matTooltip="disabled">
                <mat-icon>menu_open</mat-icon>
            </ngx-nav-icon-button>
            <ngx-nav-icon-button state="pressed" navItemStyle="fill" matTooltip="pressed">
                <mat-icon>menu_open</mat-icon>
            </ngx-nav-icon-button>
            <ngx-nav-icon-button state="focused" navItemStyle="fill" matTooltip="focused">
                <mat-icon>menu_open</mat-icon>
            </ngx-nav-icon-button>
            <ngx-nav-icon-button state="hovered" navItemStyle="fill" matTooltip="hovered">
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
                            value: `<ngx-sidenav theme="light">
                        ${templateDefaultDirective()}
                    </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Light Fill',
                            value: `<ngx-sidenav theme="light">
                        ${templateFillDirective()}
                    </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Dark',
                            value: `<ngx-sidenav theme="dark">
                        ${templateDefaultDirective()}
                    </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Dark Fill',
                            value: `<ngx-sidenav theme="dark">
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
                            value: `<ngx-sidenav theme="light">
                        ${templateDefaultComponent()}
                    </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Light',
                            value: `<ngx-sidenav  theme="light">
                        ${templateFillComponent()}
                    </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Dark Default',
                            value: `<ngx-sidenav theme="dark">
                        ${templateDefaultComponent()}
                    </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Dark',
                            value: `<ngx-sidenav theme="dark">
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
