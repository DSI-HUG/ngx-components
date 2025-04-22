import { StoryObj } from '@storybook/angular';

import { NavButtonComponentArgs, navButtonTypeVersionArgs } from '../args/nav-button.args';
import { navButtonStatesRender } from '../renders/nav-button.states.render';

export const navButtonStates: StoryObj<NavButtonComponentArgs> = {
    parameters: {
        docs: {
            description: {
                story: `Le paramètre \`[state]\` permet de **forcer un état spécifique** du \`nav-button\` (ex. : \`default\`, \`selected\`, \`disabled\`, \`loading\`, etc.).

Cet exemple permet de vérifier que **chaque état** fonctionne correctement dans les différents **contextes d’utilisation** (composant seul, dans une sidebar, avec un groupe, etc.).

> 💡 Très utile pour le développement, les tests visuels ou la documentation des variantes du composant.`
            }
        }
    },
    render: navButtonStatesRender(),
    ...navButtonTypeVersionArgs
};
