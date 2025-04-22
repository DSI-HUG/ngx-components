import { StoryObj } from '@storybook/angular';
import { includes } from 'lodash-es';

import { NavButtonComponentArgs, navButtonComponentArgs } from '../args/nav-button.args';
import { sidebarEnums } from '../enums/sidebar.enums';
import { sidenavParts } from '../renders/templates/sidenav.horizontal.content.template';

export const storyNavButtonComponentContent = [
    {
        partTitle: 'Component',
        content: [
            {
                contentTitle: 'Nav button',
                value: `<ngx-nav-button
        [state]="state"
        [theme]="theme"
        [style]="style"
        [loading]="loading"
        [selected]="selected"
        [disabled]="disabled">
        <mat-icon>menu_open</mat-icon> nav button
    </ngx-nav-button>`
            },
            {
                contentTitle: 'Nav icon button',
                value: `<ngx-nav-icon-button
        [state]="state"
        [theme]="theme"
        [style]="style"
        [loading]="loading"
        [selected]="selected"
        [disabled]="disabled">
        <mat-icon>menu_open</mat-icon>
    </ngx-nav-icon-button>`
            }
        ]
    }
];

export const navButtonComponent: StoryObj<NavButtonComponentArgs> = {
    parameters: {
        docs: {
            description: {
                story: `Un \`nav-button\` peut être utilisé sous forme de **composant**.

Il possède les mêmes caractéristiques que la directive, mais ajoute des fonctionnalités supplémentaires, telles que la gestion de l’affichage du **spinner de chargement**.

> 💡 Ce mode est recommandé lorsque vous avez besoin d’un comportement enrichi directement intégré au bouton.
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
<section class="sidenav nav-button min300x300" [class]="'theme-'+theme">
${sidenavParts(
            storyNavButtonComponentContent,
            'horizontal'
        )}


</section>`
    }),
    ...navButtonComponentArgs
};
