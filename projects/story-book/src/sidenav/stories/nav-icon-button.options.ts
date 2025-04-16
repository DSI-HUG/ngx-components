import { StoryObj } from '@storybook/angular';

import { NavButtonComponentArgs, navButtonDirectiveArgs } from '../args/nav-button.args';
import { sidebarEnums } from '../enums/sidebar.enums';
import { sidenavParts } from '../templates/sidenav.horizontal.content.template';

const buttonOptions = (): string => `
            <ngx-nav-icon-button [loading]="true" matTooltip="loading">
                <mat-icon>menu_open</mat-icon>
             </ngx-nav-icon-button>
            <ngx-nav-icon-button matTooltip="badge">
                <mat-icon [matBadge]="5">menu_open</mat-icon>
            </ngx-nav-icon-button>
            <ngx-nav-icon-button [disabled]="true" matTooltip="disable">
                <mat-icon>menu_open</mat-icon>
            </ngx-nav-icon-button>
            <ngx-nav-icon-button [selected]="true" matTooltip="selected">
                <mat-icon>menu_open</mat-icon>
            </ngx-nav-icon-button>
            <ngx-nav-icon-button
                routerLink="/page1"
                routerLinkActive="ngx-nav-state-selected"
                matTooltip="routerLink">
                <mat-icon>menu_open</mat-icon>
            </ngx-nav-icon-button>`;

export const navIconButtonOptions: StoryObj<NavButtonComponentArgs> = {
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
                    partTitle: 'Options',
                    content: [
                        {
                            contentTitle: 'Default',
                            value: `<ngx-sidenav>
                            ${buttonOptions()}
                        </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Color',
                            value: `<ngx-sidenav>
                            ${buttonOptions()}
                        </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Light',
                            value: `<ngx-sidenav theme="light">
                            ${buttonOptions()}
                        </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Light Color',
                            value: `<ngx-sidenav theme="light">
                            ${buttonOptions()}
                        </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Dark',
                            value: `<ngx-sidenav theme="dark">
                            ${buttonOptions()}
                        </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Dark Color',
                            value: `<ngx-sidenav theme="dark">
                            ${buttonOptions()}
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
