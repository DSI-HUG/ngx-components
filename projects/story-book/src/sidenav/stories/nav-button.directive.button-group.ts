import { StoryObj } from '@storybook/angular';
import { includes } from 'lodash-es';

import { NavButtonComponentArgs } from '../args/nav-button.args';
import { sidebarEnums } from '../enums/sidebar.enums';
import { sidenavParts } from '../renders/templates/sidenav.horizontal.content.template';

export const navButtonDirectiveButtonGroup: StoryObj<NavButtonComponentArgs> = {
    parameters: {
        docs: {
            description: {
                story: `La directive \`[navButtonGroup]\` permet de regrouper visuellement plusieurs \`NavIconButton\` en les entourant d’un contour commun.

Cela facilite la compréhension de l’interface en indiquant que ces boutons déclenchent des actions de type **toggle** à l’intérieur d’un même groupe fonctionnel.

> 💡 Cette directive est particulièrement utile pour les barres d’outils ou les ensembles de boutons liés à une même zone de contenu.`
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
        <section class="sidenav">
    ${sidenavParts(
            [
                {
                    partTitle: 'Nav Button Group',
                    content: [
                        {
                            contentTitle: 'Default',
                            value: `<ngx-sidenav location="top">
        <div nav-button-group>
            <button nav-icon-button matTooltip="Filter">
                <mat-icon>counter_1</mat-icon>
            </button>
            <button nav-icon-button matTooltip="Prameters">
                <mat-icon>counter_2</mat-icon>
            </button>
        </div>
    </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Light',
                            value: `<ngx-sidenav theme="light" location="top">
        <div nav-button-group>
            <button nav-icon-button matTooltip="Filter">
                <mat-icon>counter_1</mat-icon>
            </button>
            <button nav-icon-button matTooltip="Prameters">
                <mat-icon>counter_2</mat-icon>
            </button>
        </div>
    </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Dark',
                            value: `<ngx-sidenav theme="dark" location="top">
        <div nav-button-group>
            <button nav-icon-button matTooltip="Filter">
                <mat-icon>counter_1</mat-icon>
            </button>
            <button nav-icon-button matTooltip="Prameters">
                <mat-icon>counter_2</mat-icon>
            </button>
        </div>
    </ngx-sidenav>`
                        }
                    ]
                }
            ],
            'horizontal'
        )}
</section>`
    })
};
