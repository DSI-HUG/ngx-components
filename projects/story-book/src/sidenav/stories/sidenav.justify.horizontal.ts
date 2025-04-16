import { StoryObj } from '@storybook/angular';

import { NgxSidenavComponentType, sidenavJustifyArgs } from '../args/sidenav.args';
import { sidebarEnums } from '../enums/sidebar.enums';
import { sidenavParts } from '../templates/sidenav.horizontal.content.template';

export const sidenavJustifyHorizontal: StoryObj<NgxSidenavComponentType> = {
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
<section class="sidenav">
    ${sidenavParts(
            [
                {
                    partTitle: 'Horizontal',
                    content: [
                        {
                            value: `<ngx-sidenav location="top" theme="light" [navJustify]="navJustify">
                                        <button nav-icon-button matTooltip="raven"><mat-icon>raven</mat-icon></button>
                                        <button nav-icon-button matTooltip="nature"><mat-icon>emoji_nature</mat-icon></button>
                                    </ngx-sidenav>`
                        }
                    ]
                }
            ],
            'horizontal'
        )}
</section>`
    }),
    ...sidenavJustifyArgs({ pick: ['navJustify'], navJustify: 'end' })
};
