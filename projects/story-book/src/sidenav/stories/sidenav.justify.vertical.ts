import { StoryObj } from '@storybook/angular';

import { NgxSidenavComponentType, sidenavJustifyArgs } from '../args/sidenav.args';
import { sidebarEnums } from '../enums/sidebar.enums';
import { sidenavParts } from '../templates/sidenav.horizontal.content.template';

export const sidenavJustifyVertical: StoryObj<NgxSidenavComponentType> = {
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
<section class="sidenav nav-divider">
${sidenavParts(
            [
                {
                    partTitle: 'Horizontal',
                    content: [
                        {
                            value: `<ngx-sidenav [location]="SidebarLocation.LEFT" [theme]="SidebarTheme.LIGHT" [navJustify]="navJustify">
                                        <button nav-button><mat-icon>raven</mat-icon>raven</button>
                                        <button nav-button><mat-icon>emoji_nature</mat-icon>nature</button>
                                    </ngx-sidenav>`
                        }
                    ]
                }
            ],
            'vertical'
        )}
</section>`
    }),
    ...sidenavJustifyArgs({ pick: ['navJustify'] })
};
