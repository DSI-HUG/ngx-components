import { StoryObj } from '@storybook/angular';

import { NavButtonComponentArgs, navButtonComponentArgs } from '../args/nav-button.args';
import { sidebarEnums } from '../enums/sidebar.enums';

export const navIconButtonComponent: StoryObj<NavButtonComponentArgs> = {
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
<section class="sidenav nav-icon-button size100x100" [class]="'theme-'+theme">
    <ngx-nav-icon-button
        [state]="state"
        [theme]="theme"
        [style]="style"
        [loading]="loading"
        [selected]="selected"
        [disabled]="disabled">
        <mat-icon>menu_open</mat-icon>
    </ngx-nav-icon-button>

</section>`
    }),
    ...navButtonComponentArgs
};
