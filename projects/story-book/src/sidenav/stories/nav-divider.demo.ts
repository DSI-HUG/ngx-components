import { StoryObj } from '@storybook/angular';

import { navDividerArgs, NavDividerComponentArgs } from '../args/nav-divider.args';
import { sidebarEnums } from '../enums/sidebar.enums';

export const navDividerDemo: StoryObj<NavDividerComponentArgs> = {
    parameters: {
        docs: {
            description: {
                story: `Cette *story* permet de tester l’ensemble des paramètres disponibles pour la directive \`nav-divider\`.

Elle est utile pour vérifier le rendu, le comportement et l’intégration des différentes options (styles, actions, accessibilité, etc.) dans divers contextes.`
            }
        }
    },
    render: args => ({
        props: {
            ...args,
            ...sidebarEnums
        },
        template: `
<section class="sidenav nav-divider" [class]="pageSize">
    <ngx-sidenav [location]="direction === 'horizontal' ? 'top': 'left'" [theme]="theme">
        <ngx-nav-divider [direction]="direction" [theme]="theme"></ngx-nav-divider>
    </ngx-sidenav>
</section>`
    }),
    ...navDividerArgs
};
