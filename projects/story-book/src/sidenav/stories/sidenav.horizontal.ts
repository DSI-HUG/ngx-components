import { StoryObj } from '@storybook/angular';

import { NgxSidenavComponentType, sidenavArgs } from '../args/sidenav.args';
import { sidenavHorizontalTemplate } from '../renders/sidenav-simple.render';

export const sidenavHorizontal: StoryObj<NgxSidenavComponentType> = {
    parameters: {
        docs: {
            description: {
                story: `La sidebar peut également s'afficher en **mode horizontale**.

> 💡 Les valeurs \`"top"\` et \`"bottom"\` correspondent à une disposition **horizontale**.
>
> Dans cet exemple, les actions sont déclenchées par un **clic**, avec un comportement de type *toggle* (activation/désactivation).
>
> Quand une route est active, le bouton correspondant apparaît en **surbrillance**.`
            }
        }
    },
    render: sidenavHorizontalTemplate({ location: [], theme: [], disabled: [] }),
    ...{
        ...sidenavArgs,
        args: {
            ...sidenavArgs.args,
            location: 'top'
        }
    }
};
