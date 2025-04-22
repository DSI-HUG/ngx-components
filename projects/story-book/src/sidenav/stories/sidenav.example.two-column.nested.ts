import { StoryObj } from '@storybook/angular';

import { NgxSidenavComponentType } from '../args/sidenav.args';
import { sidebarEnums } from '../enums/sidebar.enums';
import { sidenavContentTitleText } from '../helpers/content-templates/templates/sidenav.content.text.template';

export const sidenavExampleTwoColumnNested: StoryObj<NgxSidenavComponentType> = {
    parameters: {
        docs: {
            description: {
                story: `Dans cet exemple, nous avons trois sidebars :

---

### 1️⃣ Première sidebar

Elle contient :
- un premier bouton *settings* qui permet d'ouvrir le \`nav-panel\`.
- un deuxième bouton *filtre* qui est un raccourci pour ouvrir le panel et afficher le **contenu 1**.

---

### 2️⃣ Deuxième sidebar (à l’intérieur du panel)

Elle contient :
- un bouton *filtre* pour afficher le **contenu 1**
- un bouton *paramètre* pour afficher le **contenu 2**

➡️ Les deux contenus peuvent être affichés **simultanément**.

---

### 3️⃣ Troisième sidebar (également à l’intérieur du panel)

Elle contient :
- un bouton *1* pour afficher le **contenu 3**
- un bouton *2* pour afficher le **contenu 4**

➡️ Ces deux contenus s’affichent **alternativement** (l’un ou l’autre).

---

### ⚙️ Fonctionnement des groupes

Pour créer ces comportements différents, il suffit d’utiliser les **groupes**.

Il faut ajouter l’attribut suivant sur **le contenant** :

\`\`\`html
<ngx-dynamic-content groupId="1" ...>
\`\`\`

---

### 📌 Note

Les contenants peuvent être de type :

- \`ngx-dynamic-content\`
- \`ngx-openable\`
- \`ngx-panel\`
- \`ngx-panel-group\`

La différence entre ces types est expliquée [ici](#).

Les boutons s’activent automatiquement lorsque le contenu auquel ils sont liés est affiché.`
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
        <div class="flex flex-column flex-auto">
            <!-- # Sidenav -->
            <ngx-sidenav theme="none"
                         location="top">
                <button nav-icon-button
                    matTooltip="Prameters"
                    navAction="toggle"
                    [navActionContainer]="panelLeft">
                    <mat-icon>settings</mat-icon>
                </button>
                <ngx-nav-divider></ngx-nav-divider>
                <button nav-icon-button
                    matTooltip="Filter"
                    navAction="toggle"
                    [navActionContainer]="[panelFilter, panelLeft]"
                    [navActionContent]="[templates.contentAccordion2()]">
                    <mat-icon>filter_alt</mat-icon>
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
                            [navActionContainer]="panelTune"
                            [navActionContent]="templates.contentAccordion1()">
                            <mat-icon>tune</mat-icon>
                        </button>
                    </ngx-sidenav>
                    <ngx-openable isContainer="true">
                        <div class="flex flex-column w-full gap-4">
                            <div class="px-4"><h4>Settings 1</h4></div>
                            <ngx-dynamic-content #panelFilter></ngx-dynamic-content>
                            <ngx-dynamic-content #panelTune></ngx-dynamic-content>
                        </div>
                    </ngx-openable>
                    <ngx-sidenav theme="none"
                                 location="top">
                        <div nav-button-group>
                            <button nav-icon-button
                                matTooltip="Filter"
                                navAction="toggle"
                                [navActionContainer]="history"
                                [navActionContent]="templates.contentAccordion1()">
                                <mat-icon>counter_1</mat-icon>
                            </button>
                            <button nav-icon-button
                                matTooltip="Prameters"
                                navAction="toggle"
                                [navActionContainer]="comment"
                                [navActionContent]="templates.contentAccordion2()">
                                <mat-icon>counter_2</mat-icon>
                            </button>
                        </div>
                    </ngx-sidenav>
                    <ngx-dynamic-content isContainer="true">
                        <div class="flex flex-column w-full gap-4 px-4">
                            <h4>Settings 2</h4>
                            <ngx-dynamic-content #history groupId="1">
                                <h4>History</h4>
                            </ngx-dynamic-content>
                            <ngx-dynamic-content #comment groupId="1">
                                <h4>Comment</h4>
                            </ngx-dynamic-content>
                        </div>
                    </ngx-dynamic-content>
                </ngx-nav-panel>
            </div>
        </div>
    </div>

</section>

<!-- # Templates -->
<content-templates #templates></content-templates>`
    })
};
