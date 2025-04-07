import { NavDividerComponent } from '@hug/ngx-sidenav';
import { StoryObj } from '@storybook/angular';

import { navDividerArgs } from '../args/nav-divider.args';
import { sidebarEnums } from '../enums/sidebar.enums';
import { sidenavParts } from '../templates/sidenav.horizontal.content.template';

export const navDividerVertical: StoryObj<NavDividerComponent> = {
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
                            contentTitle: 'Default',
                            value: `<ngx-sidenav [location]="SidebarLocation.LEFT">
                        <ngx-nav-divider></ngx-nav-divider>
                    </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Light',
                            value: `<ngx-sidenav [theme]="SidebarTheme.LIGHT" [location]="SidebarLocation.LEFT">
                        <ngx-nav-divider></ngx-nav-divider>
                    </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Dark',
                            value: `<ngx-sidenav [theme]="SidebarTheme.DARK" [location]="SidebarLocation.LEFT">
                    <ngx-nav-divider></ngx-nav-divider>
                </ngx-sidenav>`
                        }
                    ]
                }
            ],
            'vertical'
        )}
</section>`
    }),
    ...navDividerArgs
};
