import { StoryObj } from '@storybook/angular';

import { NavButtonComponentArgs } from '../args/nav-button.args';
import { sidebarEnums } from '../enums/sidebar.enums';
import { sidenavParts, sidenavSubpart } from '../templates/sidenav.horizontal.content.template';

const templateOneLineDirective = (): string => `
            <button nav-button>
                <mat-icon>check_circle</mat-icon> one line
            </button>
            <button nav-button [selected]="true">
                <mat-icon>select</mat-icon> selected
            </button>`;
const templateTwoLineDirective = (): string => `
            <button nav-button>
                <mat-icon>check_circle</mat-icon> one line
            </button>
            <button nav-button>
                <mat-icon>add_circle</mat-icon> icon with two line
            </button>`;
const templateTwoLineCutDirective = (): string => `
            <button nav-button>
                <mat-icon>check_circle</mat-icon> one line
            </button>
            <button nav-button>
                <mat-icon>add_circle</mat-icon> <span text-ellipsis>icon with two line</span>
            </button>`;
const templateOneLineComponent = (): string => `
            <ngx-nav-button>
                <mat-icon>check_circle</mat-icon> one line
            </ngx-nav-button>
            <ngx-nav-button [selected]="true">
                <mat-icon>select</mat-icon> selected
            </ngx-nav-button>`;
const templateTwoLineComponent = (): string => `
            <ngx-nav-button>
                <mat-icon>check_circle</mat-icon> one line
            </ngx-nav-button>
            <button nav-button>
                <mat-icon>add_circle</mat-icon> icon with two line
            </button>`;
const templateTwoLineCutComponent = (): string => `
            <ngx-nav-button>
                <mat-icon>check_circle</mat-icon> one line
            </ngx-nav-button>
            <button nav-button>
                <mat-icon>add_circle</mat-icon> <span text-ellipsis>icon with two line</span>
            </button>`;

const contentWrapper = (content: string, size = 'NavSize.S'): Parameters<typeof sidenavSubpart>[1] => [
    {
        contentTitle: 'Default',
        value: `<ngx-sidenav [location]="SidebarLocation.TOP" [navSize]="${size}">
            ${content}
        </ngx-sidenav>`
    },
    {
        contentTitle: 'Light',
        value: `<ngx-sidenav [location]="SidebarLocation.TOP" [theme]="SidebarTheme.LIGHT" [navSize]="${size}">
            ${content}
        </ngx-sidenav>`
    },
    {
        contentTitle: 'Dark',
        value: `<ngx-sidenav [location]="SidebarLocation.TOP" [theme]="SidebarTheme.DARK" [navSize]="${size}">
            ${content}
        </ngx-sidenav>`
    }
];

export const navButtonHorizontal: StoryObj<NavButtonComponentArgs> = {
    parameters: {
        docs: {
            description: {
                story: 'This story demonstrates the standard usage of `NavButtonComponent`.'
            }
        }
    },
    render: args => ({
        props: {
            ...args,
            ...sidebarEnums
        },
        template: `<section class="sidenav nav-button">
            ${sidenavParts(
            [
                {
                    partTitle: 'One line',
                    subpart: [
                        {
                            subpartTitle: 'Directive',
                            content: contentWrapper(templateOneLineDirective())
                        },
                        {
                            subpartTitle: 'Component',
                            content: contentWrapper(templateOneLineComponent())
                        }
                    ]
                },
                {
                    partTitle: 'Two Line + Text Ellipsis',
                    subpart: [
                        {
                            subpartTitle: 'Directive',
                            content: contentWrapper(templateTwoLineCutDirective())
                        },
                        {
                            subpartTitle: 'Component',
                            content: contentWrapper(templateTwoLineCutComponent())
                        }
                    ]
                },
                {
                    partTitle: 'Two Line Large',
                    subpart: [
                        {
                            subpartTitle: 'Directive',
                            content: contentWrapper(templateTwoLineDirective(), 'NavSize.M')
                        },
                        {
                            subpartTitle: 'Component',
                            content: contentWrapper(templateTwoLineComponent(), 'NavSize.M')
                        }
                    ]
                }
            ],
            'horizontal'
        )}
        </section>`
    })
};
