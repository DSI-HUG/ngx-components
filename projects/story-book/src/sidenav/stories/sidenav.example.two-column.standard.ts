import { StoryObj } from '@storybook/angular';

import { NgxSidenavComponentType } from '../args/sidenav.args';
import { sidebarEnums } from '../enums/sidebar.enums';
import { sidenavContentTitleText } from '../helpers/content-templates/templates/sidenav.content.text.template';

export const sidenavExampleTwoColumnStandard: StoryObj<NgxSidenavComponentType> = {
    parameters: {
        docs: {
            description: {
                story: `Cet exemple montre deux sidebars : une verticale (à gauche) et une horizontale (en haut).

---

### 1️⃣ Première sidebar (verticale)

Affiche un panneau de navigation (*nav-panel*) lors de l’événement \`mouseover\`, puis le masque automatiquement.

---

### 2️⃣ Deuxième sidebar (horizontale)

Active un contenu dans un panneau de navigation lors de l’événement \`click\`. Ce contenu reste affiché et se masque uniquement lorsqu’on clique à nouveau sur le bouton (comportement de type *toggle*).

---

### 📌 Note

Les contenants peuvent être de différents types :

- Pour la sidebar de gauche, les boutons s’activent lorsque la route est active, grâce à \`routerLink\`.
- Pour la sidebar du haut, les boutons s’activent automatiquement lorsque le contenu auquel ils sont liés est affiché.`
            }
        }
    },
    render: args => ({
        props: {
            ...args,
            ...sidebarEnums
        },
        template: `
<section class="sidenav nav-sidenav min600x400">
    <!-- Page -->
    <div class="page">
        <!-- # Sidenav -->
        <ngx-sidenav theme="light" >
            <button nav-button
                routerLink="/item1"
                routerLinkActive="ngx-nav-state-selected"
                [routerLinkActiveOptions]="{exact: false}"
                navAction="open"
                [navActionContainer]="panelRight"
                [navActionContent]="templates.contentAccordion1()">
                <mat-icon>bedroom_baby</mat-icon> open 1
            </button>
            <button nav-button
                routerLink="/item2"
                routerLinkActive="ngx-nav-state-selected"
                [routerLinkActiveOptions]="{exact: false}"
                navAction="open"
                [navActionContainer]="panelRight"
                [navActionContent]="templates.contentAccordion2()">
                <mat-icon>nest_farsight_weather</mat-icon> open 2
            </button>
        </ngx-sidenav>
        <!-- # Panels Left -->
        <ngx-nav-panel #panelRight panelType="open-right-overlay"></ngx-nav-panel>
        <div class="flex flex-column flex-auto">
            <!-- # Sidenav -->
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
                    [navActionContainer]="panelTune"
                    [navActionContent]="templates.contentAccordion1()">
                    <mat-icon>tune</mat-icon>
                </button>
            </ngx-sidenav>
            <div class="flex flex-row flex-auto">

                <div class="page-container">
                    <!-- # Content -->
                    <div class="content">
                        ${sidenavContentTitleText()}
                    </div>
                </div>
                <!-- # Panels Right () -->
                 <ngx-nav-panel #panelLeft
                                isContainer="true"
                                panelType="open-left"
                                panelTheme="none">
                    <div class="flex flex-column w-full gap-4">
                        <ngx-dynamic-content #panelFilter></ngx-dynamic-content>
                        <ngx-dynamic-content #panelTune></ngx-dynamic-content>
                    </div>
                </ngx-nav-panel>
            </div>
        </div>
    </div>

</section>

<!-- # Templates -->
<content-templates #templates></content-templates>`
    })
};
