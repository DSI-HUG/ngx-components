import { StoryObj } from '@storybook/angular';

import { NgxSidenavComponentType, sidenavArgs } from '../args/sidenav.args';
import { sidenavSimpleRender } from '../renders/sidenav-simple.render';

export const sidenavVertical: StoryObj<NgxSidenavComponentType> = {
    parameters: {
        docs: {
            description: {
                story: `Par défaut, le composant \`ngx-sidenav\` est positionné à gauche (\`location="left"\`) et s'affiche en **mode verticale**.

> 💡 Les valeurs \`"left"\` et \`"right"\` correspondent à une disposition **verticale**.
>
> Dans cet exemple, les actions s’effectuent au **survol** (*rollOver*).
>
> Quand une route est active, le bouton correspondant apparaît en **surbrillance**.`
            }
        }
    },
    render: sidenavSimpleRender({ pageSize: [], location: [], theme: [], disabled: [] }), // useVar to prevent scroll on preview
    ...sidenavArgs
};
