import { StoryObj } from '@storybook/angular';

import { NgxSidenavComponentType, sidenavJustifyArgs } from '../args/sidenav.args';
import { sidenavSimpleRender } from '../renders/sidenav-simple.render';

export const sidenavJustify: StoryObj<NgxSidenavComponentType> = {
    parameters: {
        docs: {
            description: {
                story: `La  directive \`[navJustify]\` permet de définir l’alignement du contenu selon les valeurs : **'start'**, **'center'** ou **'end'**.
Elle agit en modifiant la valeur de la propriété CSS \`justify-content\``
            }
        }
    },
    render: sidenavSimpleRender({ navJustify: 'start' }),
    ...sidenavJustifyArgs()
};
