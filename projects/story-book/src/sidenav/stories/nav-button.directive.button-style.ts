import { StoryObj } from '@storybook/angular';

import { NavButtonComponentArgs, navButtonStyleArgs } from '../args/nav-button.args';
import { navButtonStatesRender } from '../renders/nav-button.states.render';
import { navButtonStates } from './nav-button.states';

export const navButtonDirectiveButtonStyle: StoryObj<NavButtonComponentArgs> = {
    ...navButtonStates,
    parameters: {
        docs: {
            description: {
                story: `
La directive \`[navButtonStyle]\` permet de sélectionner un style d’affichage spécifique pour le bouton.

#### Styles prédéfinis

- **\`none\`** : aucun style n’est appliqué. Le bouton conserve son apparence par défaut.
- **\`fill\`** : applique une couleur de fond derrière le bouton, pour un effet visuel plus marqué.

#### Personnalisation

Si vous souhaitez ajouter de nouveaux styles d’affichage (par exemple, un style *outline*), c’est ici qu’il faudra les définir.
La directive est conçue pour être extensible et accueillir d’autres variantes à l’avenir.

> 💡 Utilisez \`[navButtonStyle]\` pour adapter visuellement vos \`nav-buttons\` selon les besoins de votre interface ou votre design system.
`
            }
        }
    },
    render: navButtonStatesRender({ navButtonStyle: [] }),
    ...navButtonStyleArgs
};
