import { StoryObj } from '@storybook/angular';

import { NavPanelComponentType, navPanelScrollArgs } from '../args/nav-panel.args';
import { navPanelRender } from '../renders/nav-panel.render';

export const navPanelScroll: StoryObj<NavPanelComponentType> = {
    parameters: {
        docs: {
            description: {
                story: 'Dans cet exemple, on peut constater le bon affichage du **nav-panel** ainsi que de son contenu en cas de dépassement.'
            }
        }
    },
    render: navPanelRender({
        expanded: [],
        panelType: []
    }),
    ...navPanelScrollArgs
};
