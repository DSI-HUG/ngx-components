import { StoryObj } from '@storybook/angular';

import { NavPanelComponentType } from '../args/nav-panel.args';

export const navPanelComponentDynamicContent: StoryObj<NavPanelComponentType> = {
    parameters: {
        docs: {
            description: {
                story: '`ngx-dynamic-content` : Permet d’ajouter du contenu dynamiquement à l’aide de la fonctionnalité `<ng-content>` ou à l’aide de la directive `[navAction]`.'
            }
        }
    },
    render: args => ({
        props: {
            ...args
        },
        template: `
<section class="sidenav nav-sidenav min600x400">
     <ngx-nav-panel class="flex h-full"
                    expanded="true"
                    panelType="open-left"
                    panelTheme="none">
        <ngx-sidenav theme="none"
                     location="top">
            <button nav-icon-button
                matTooltip="Filter"
                navAction="toggle"
                [navActionContainer]="panelFilter"
                [navActionContent]="templates.contentAccordion2()">
                <mat-icon>filter_alt</mat-icon>
            </button>
            <button nav-icon-button
                matTooltip="Prameters"
                navAction="toggle"
                [navActionContainer]="panelFilter"
                [navActionContent]="templates.contentAccordion1()">
                <mat-icon>tune</mat-icon>
            </button>
        </ngx-sidenav>
        <ngx-dynamic-content #panelFilter [style.border]="'solid 5px blue'"></ngx-dynamic-content>
    </ngx-nav-panel>
</section>

<!-- # Templates -->
<content-templates #templates></content-templates>`
    })
};
