import { StoryObj } from '@storybook/angular';
import { includes } from 'lodash-es';

import { NavButtonComponentArgs, navButtonDirectiveArgs } from '../args/nav-button.args';
import { sidebarEnums } from '../enums/sidebar.enums';
import { sidenavParts } from '../renders/templates/sidenav.horizontal.content.template';

export const navButtonDirective: StoryObj<NavButtonComponentArgs> = {
    parameters: {
        docs: {
            description: {
                story: `Un \`nav-button\` peut être appliqué en tant que **directive** sur un élément HTML ou un composant, tout comme \`mat-button\` dans Angular Material.
Cela permet d'ajouter des comportements spécifiques sans modifier la structure du bouton.
`
            }
        }
    },
    render: args => ({
        props: {
            ...args,
            ...sidebarEnums,
            includes
        },
        template: `
<section class="sidenav nav-button" [class]="pageSize  + ' theme-'+theme">
${sidenavParts(
            [
                {
                    partTitle: 'Directive',
                    content: [
                        {
                            contentTitle: 'Nav button',
                            value: `<button
        nav-button
        [state]="state"
        [theme]="theme"
        [style]="style"
        [selected]="selected"
        [disabled]="disabled">
        <mat-icon>menu_open</mat-icon> nav button
    </button>`
                        },
                        {
                            contentTitle: 'Nav icon button',
                            value: `<button
        nav-icon-button
        [state]="state"
        [theme]="theme"
        [style]="style"
        [selected]="selected"
        [disabled]="disabled"
        matTooltip="nav icon button">
        <mat-icon>menu_open</mat-icon>
    </button>`
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
