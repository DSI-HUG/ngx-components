import { StoryObj } from '@storybook/angular';

import { NavButtonComponentArgs, navButtonDirectiveActionArgs } from '../args/nav-button.args';
import { sidenavContentTitleText } from '../helpers/content-templates/templates/sidenav.content.text.template';
import { sidenavSimpleRender } from '../renders/sidenav-simple.render';

export const navButtonDirectiveAction: StoryObj<NavButtonComponentArgs> = {
    parameters: {
        docs: {
            description: {
                story: `La directive \`[navAction]\` permet d’ajouter un comportement interactif au \`navButton\`. Elle prend en charge plusieurs types d’actions :

- **\`toggle\`** : le ou les conteneur(s) sélectionnés s’affichent ou se masquent successivement au clic.
- **\`open\`** : le ou les conteneur(s) sélectionnés s’affichent et se masquent automatiquement lors des événements \`mouseover\` et \`mouseleave\`.
- **\`close\`** : ferme le ou les conteneur(s) sélectionnés.
- **\`close-group\`** : ferme un ou plusieurs groupes de conteneurs sélectionnés.
- **\`close-all\`** : ferme tous les conteneurs actifs.

#### Paramètres associés

La directive \`navAction\` peut être complétée par les paramètres suivants :

- **\`[navActionContainer]\`** : définit le ou les conteneur(s) ciblés.
- **\`[navActionContent]\`** : définit le ou les contenu(s) à afficher/masquer.
- **\`[navActionGroup]\`** : définit le ou les groupe(s) auxquels appartient le bouton.`
            }
        }
    },
    render: sidenavSimpleRender({
        routerLink: false,
        navAction1: ['navAction1'],
        navActionContainer1: ['dynamic.getRef(navActionContainer1)'],
        navActionContent1: ['templates.getRef(navActionContent1)'],
        navActionGroup1: ['navActionGroup1'],
        navAction2: ['navAction2'],
        navActionContainer2: ['dynamic.getRef(navActionContainer2)'],
        navActionContent2: ['templates.getRef(navActionContent2)'],
        navActionGroup2: ['navActionGroup2'],
        container: `
                <dynamic-refs #dynamic [refs]="{panelRight, panelLeft}"></dynamic-refs>
                <div class="page-container">
                    <ngx-nav-panel #panelRight panelType="open-right"></ngx-nav-panel>
                    <!-- # Content -->
                    <div class="content">
                        ${sidenavContentTitleText()}
                    </div>
                    <ngx-nav-panel #panelLeft panelType="open-left"></ngx-nav-panel>
                </div>`
    }),
    ...navButtonDirectiveActionArgs
};
