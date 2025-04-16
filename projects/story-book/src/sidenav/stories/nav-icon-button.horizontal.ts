import { StoryObj } from '@storybook/angular';

import { NavButtonComponentArgs, navButtonDirectiveArgs } from '../args/nav-button.args';
import { sidebarEnums } from '../enums/sidebar.enums';
import { sidenavParts, sidenavSubpart } from '../templates/sidenav.horizontal.content.template';

const templateOneLineDirective = (): string => `
            <button nav-icon-button  matTooltip="one line">
                <mat-icon>check_circle</mat-icon>
            </button>
            <button nav-icon-button [selected]="true" matTooltip="selected">
                <mat-icon>select</mat-icon>
            </button>`;
const templateOneLineComponent = (): string => `
            <ngx-nav-icon-button  matTooltip="one line">
                <mat-icon>check_circle</mat-icon>
            </ngx-nav-icon-button>
            <ngx-nav-icon-button [selected]="true"  matTooltip="selected">
                <mat-icon>select</mat-icon>
            </ngx-nav-icon-button>`;

const contentWrapper = (content: string): Parameters<typeof sidenavSubpart>[1] => [
    {
        contentTitle: 'Default',
        value: `<ngx-sidenav location="top">
            ${content}
        </ngx-sidenav>`
    },
    {
        contentTitle: 'Light',
        value: `<ngx-sidenav location="top" theme="light">
            ${content}
        </ngx-sidenav>`
    },
    {
        contentTitle: 'Dark',
        value: `<ngx-sidenav location="top" theme="dark">
            ${content}
        </ngx-sidenav>`
    }
];

export const navIconButtonHorizontal: StoryObj<NavButtonComponentArgs> = {
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
                }
            ],
            'horizontal'
        )}
</section>`
    }),
    ...navButtonDirectiveArgs
};
