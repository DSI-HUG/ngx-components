import { StoryObj } from '@storybook/angular';

import { NavButtonComponentArgs, navButtonDirectiveArgs } from '../args/nav-button.args';
import { sidebarEnums } from '../enums/sidebar.enums';

export const navButtonStandard: StoryObj<NavButtonComponentArgs> = {
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
<section class="sidenav nav-button size100x100" [class]="'theme-'+theme">
    <button
        nav-button
        [state]="state"
        [theme]="theme"
        [style]="style"
        [selected]="selected"
        [disabled]="disabled">
        <mat-icon>menu_open</mat-icon> nav button
    </button>

</section>`
    }),
    ...navButtonDirectiveArgs
};
