import { StoryObj } from '@storybook/angular';

import { NavButtonComponentArgs } from '../args/nav-button.args';
import { sidebarEnums } from '../enums/sidebar.enums';
import { sidenavParts } from '../templates/sidenav.horizontal.content.template';

const buttonOptions = (): string => `
            <ngx-nav-button [loading]="true" >
                <mat-icon>menu_open</mat-icon>
                loading
             </ngx-nav-button>
            <ngx-nav-button>
                <mat-icon [matBadge]="5">menu_open</mat-icon>
                badge
            </ngx-nav-button>
            <ngx-nav-button [disabled]="true">
                <mat-icon>menu_open</mat-icon>
                disable
            </ngx-nav-button>
            <ngx-nav-button [selected]="true">
                <mat-icon>menu_open</mat-icon>
                selected
            </ngx-nav-button>
            <ngx-nav-button
                routerLink="/page1"
                routerLinkActive="ngx-nav-state-selected">
                <mat-icon>menu_open</mat-icon>
                routerLink
            </ngx-nav-button>`;

export const navButtonOptions: StoryObj<NavButtonComponentArgs> = {
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
                            value: `<ngx-sidenav [theme]="SidebarTheme.LIGHT">
                            ${buttonOptions()}
                        </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Light Color',
                            value: `<ngx-sidenav [theme]="SidebarTheme.LIGHT">
                            ${buttonOptions()}
                        </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Dark',
                            value: `<ngx-sidenav [theme]="SidebarTheme.DARK">
                            ${buttonOptions()}
                        </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Dark Color',
                            value: `<ngx-sidenav [theme]="SidebarTheme.DARK">
                            ${buttonOptions()}
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
