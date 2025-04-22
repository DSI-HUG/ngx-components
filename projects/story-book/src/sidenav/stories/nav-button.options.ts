import { StoryObj } from '@storybook/angular';
import { includes } from 'lodash-es';

import { NavButtonComponentArgs, navButtonVersionArgs } from '../args/nav-button.args';
import { sidebarEnums } from '../enums/sidebar.enums';
import { sidenavParts } from '../renders/templates/sidenav.horizontal.content.template';

const buttonOptions = (): string => `
            <ngx-nav-button [loading]="true" >
                <mat-icon>menu_open</mat-icon>
                loading
             </ngx-nav-button>
            <ngx-nav-button>
                <mat-icon [matBadge]="5" >menu_open</mat-icon>
                badge
            </ngx-nav-button>
            <ngx-nav-button [disabled]="true">
                <mat-icon>menu_open</mat-icon>
                disable
            </ngx-nav-button>
            <ngx-nav-button [selected]="true">
                <mat-icon>menu_open</mat-icon>
                selected
            </ngx-nav-button>
            <ngx-nav-button
                routerLink="/page1"
                routerLinkActive="ngx-nav-state-selected">
                <mat-icon>menu_open</mat-icon>
                routerLink
            </ngx-nav-button>`;

const buttonIconOptions = (): string => `
            <ngx-nav-icon-button [loading]="true" matTooltip="loading">
                <mat-icon>menu_open</mat-icon>
             </ngx-nav-icon-button>
            <ngx-nav-icon-button matTooltip="badge">
                <mat-icon [matBadge]="5">menu_open</mat-icon>
            </ngx-nav-icon-button>
            <ngx-nav-icon-button [disabled]="true" matTooltip="disable">
                <mat-icon>menu_open</mat-icon>
            </ngx-nav-icon-button>
            <ngx-nav-icon-button [selected]="true" matTooltip="selected">
                <mat-icon>menu_open</mat-icon>
            </ngx-nav-icon-button>
            <ngx-nav-icon-button
                routerLink="/page1"
                routerLinkActive="ngx-nav-state-selected"
                matTooltip="routerLink">
                <mat-icon>menu_open</mat-icon>
            </ngx-nav-icon-button>`;

export const navButtonOptions: StoryObj<NavButtonComponentArgs> = {
    parameters: {
        docs: {
            description: {
                story: `Le composant \`nav-button\` prend en charge un ensemble complet de fonctionnalités intégrées, notamment :

- La gestion de l’état de **chargement** (affichage d’un spinner)
- L’affichage d’un **badge**
- La **désactivation** du bouton (\`disabled\`)
- La **sélection** du bouton
- La compatibilité avec **\`routerLink\`**

> 💡 Ces fonctionnalités sont directement intégrées au composant, ce qui simplifie son utilisation dans les cas d’usage courants.`
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
<section class="sidenav nav-button">
    ${sidenavParts(
            [
                {
                    partTitle: 'MatButton > Options',
                    if: 'includes(["all", "nav-button"], navButtonVersion)',
                    content: [
                        {
                            contentTitle: 'Default',
                            value: `<ngx-sidenav>
                            ${buttonOptions()}
                        </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Color',
                            value: `<ngx-sidenav>
                            ${buttonOptions()}
                        </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Light',
                            value: `<ngx-sidenav theme="light">
                            ${buttonOptions()}
                        </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Light Color',
                            value: `<ngx-sidenav theme="light">
                            ${buttonOptions()}
                        </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Dark',
                            value: `<ngx-sidenav theme="dark">
                            ${buttonOptions()}
                        </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Dark Color',
                            value: `<ngx-sidenav theme="dark">
                            ${buttonOptions()}
                        </ngx-sidenav>`
                        }
                    ]
                }, {
                    partTitle: 'MatIconButton > Options',
                    if: 'includes(["all", "nav-icon-button"], navButtonVersion)',
                    content: [
                        {
                            contentTitle: 'Default',
                            value: `<ngx-sidenav>
                            ${buttonIconOptions()}
                        </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Color',
                            value: `<ngx-sidenav>
                            ${buttonIconOptions()}
                        </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Light',
                            value: `<ngx-sidenav theme="light">
                            ${buttonIconOptions()}
                        </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Light Color',
                            value: `<ngx-sidenav theme="light">
                            ${buttonIconOptions()}
                        </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Dark',
                            value: `<ngx-sidenav theme="dark">
                            ${buttonIconOptions()}
                        </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Dark Color',
                            value: `<ngx-sidenav theme="dark">
                            ${buttonIconOptions()}
                        </ngx-sidenav>`
                        }
                    ]
                }
            ],
            'vertical'
        )}
</section>`
    }),
    ...navButtonVersionArgs
};
