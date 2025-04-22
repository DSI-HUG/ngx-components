import { StoryObj } from '@storybook/angular';

import { NavPanelComponentType } from '../args/nav-panel.args';

export const navPanelComponentOpenable: StoryObj<NavPanelComponentType> = {
    parameters: {
        docs: {
            description: {
                story: `Le composant \`ngx-openable\` est caché par défaut et peut être ouvert à l’aide de l’attribut \`[expanded]\`.
Il est également possible de préciser les attributs \`[childrenGroupIds]\`, \`[groupId]\` et \`[isContainer]\`.`
            }
        }
    },

    render: args => ({
        props: {
            ...args,
            isOpen: false
        },
        template: `
<section class="sidenav nav-sidenav min600x400">
     <ngx-nav-panel class="flex h-full"
                    expanded="true"
                    panelType="open-left"
                    panelTheme="none">
        <ngx-sidenav theme="none" location="top">
            <button nav-icon-button (click)="isOpen = !isOpen">
                <mat-icon>{{isOpen ? 'lock_open' : 'lock_close'}}</mat-icon>
            </button>
        </ngx-sidenav>
        <ngx-openable [style.border]="'solid 5px green'" [expanded]="isOpen">
            <h4>Openable panel</h4>
        </ngx-openable>
    </ngx-nav-panel>
</section>

<!-- # Templates -->
<content-templates #templates></content-templates>`
    })
};
