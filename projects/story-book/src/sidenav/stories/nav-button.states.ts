import { StoryObj } from '@storybook/angular';

import { NavButtonComponentArgs } from '../args/nav-button.args';
import { sidebarEnums } from '../enums/sidebar.enums';
import { sidenavParts } from '../templates/sidenav.horizontal.content.template';

const templateDefaultDirective = (): string => `
            <button nav-button state="enabled">
                <mat-icon>menu_open</mat-icon> enabled
            </button>
            <button nav-button state="disabled">
                <mat-icon>menu_open</mat-icon> disabled
            </button>
            <button nav-button state="pressed">
                <mat-icon>menu_open</mat-icon> pressed
            </button>
            <button nav-button state="focused">
                <mat-icon>menu_open</mat-icon> focused
            </button>
            <button nav-button state="hovered">
                <mat-icon>menu_open</mat-icon> hovered
            </button>`;

const templateFillDirective = (): string => `
            <button nav-button state="enabled" style="fill">
                <mat-icon>menu_open</mat-icon> enabled
            </button>
            <button nav-button state="disabled" style="fill">
                <mat-icon>menu_open</mat-icon> disabled
            </button>
            <button nav-button state="pressed" style="fill">
                <mat-icon>menu_open</mat-icon> pressed
            </button>
            <button nav-button state="focused" style="fill">
                <mat-icon>menu_open</mat-icon> focused
            </button>
            <button nav-button state="hovered" style="fill">
                <mat-icon>menu_open</mat-icon> hovered
            </button>`;

const templateDefaultComponent = (): string => `
            <ngx-nav-button state="enabled">
                <mat-icon>menu_open</mat-icon> enabled
            </ngx-nav-button>
            <ngx-nav-button state="disabled">
                <mat-icon>menu_open</mat-icon> disabled
            </ngx-nav-button>
            <ngx-nav-button state="pressed">
                <mat-icon>menu_open</mat-icon> pressed
            </ngx-nav-button>
            <ngx-nav-button state="focused">
                <mat-icon>menu_open</mat-icon> focused
            </ngx-nav-button>
            <ngx-nav-button state="hovered">
                <mat-icon>menu_open</mat-icon> hovered
            </ngx-nav-button>`;

const templateFillComponent = (): string => `
            <ngx-nav-button state="enabled" navItemStyle="fill">
                <mat-icon>menu_open</mat-icon> enabled
            </ngx-nav-button>
            <ngx-nav-button state="disabled" navItemStyle="fill">
                <mat-icon>menu_open</mat-icon> disabled
            </ngx-nav-button>
            <ngx-nav-button state="pressed" navItemStyle="fill">
                <mat-icon>menu_open</mat-icon> pressed
            </ngx-nav-button>
            <ngx-nav-button state="focused" navItemStyle="fill">
                <mat-icon>menu_open</mat-icon> focused
            </ngx-nav-button>
            <ngx-nav-button state="hovered" navItemStyle="fill">
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
    })
};
