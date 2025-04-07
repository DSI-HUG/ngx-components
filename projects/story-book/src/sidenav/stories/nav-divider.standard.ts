import { NavDividerComponent } from '@hug/ngx-sidenav';
import { StoryObj } from '@storybook/angular';

import { navDividerArgs } from '../args/nav-divider.args';
import { sidebarEnums } from '../enums/sidebar.enums';

export const navDividerStandard: StoryObj<NavDividerComponent> = {
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
<section class="sidenav nav-divider size100x100" [class]="'theme-'+theme">

        <ngx-nav-divider [direction]="direction" [theme]="theme"></ngx-nav-divider>

</section>`
    }),
    ...navDividerArgs
};
