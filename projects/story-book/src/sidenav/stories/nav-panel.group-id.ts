import { StoryObj } from '@storybook/angular';

import { NgxSidenavComponentType } from '../args/sidenav.args';
import { sidenavSimpleRender } from '../renders/sidenav-simple.render';

export const navPanelGroupId: StoryObj<NgxSidenavComponentType> = {
    parameters: {
        docs: {
            description: {
                story: `Dans cet exemple, les actions s’effectuent au **survol** (*rollOver*).

Il est possible de choisir de placer le contenu directement dans deux panneaux distincts, afin d’améliorer la lisibilité du code.

Dans ce cas, il faut utiliser la propriété \`groupId\` pour les regrouper dans le même groupe.
Ainsi, lorsqu’un panneau s’ouvre, le précédent se ferme automatiquement.`
            }
        }
    },
    render: sidenavSimpleRender({
        buttons: `<button nav-button
                    navAction="open"
                    [navActionContainer]="panelOpenLeft1">
                    <mat-icon>group</mat-icon> Panel 1
                </button>
                <button nav-button
                    navAction="open"
                    [navActionContainer]="panelOpenLeft2">
                    <mat-icon>group</mat-icon> Panel 2
                </button>`,
        panels: `<ngx-nav-panel #panelOpenLeft1 panelType="open-left" groupId="1">
                    <ng-container [ngTemplateOutlet]="templates.contentAccordion1()"></ng-container>
                </ngx-nav-panel>
                <ngx-nav-panel #panelOpenLeft2 panelType="open-left" groupId="1">
                    <ng-container [ngTemplateOutlet]="templates.contentAccordion2()"></ng-container>
                </ngx-nav-panel>`
    })
};
