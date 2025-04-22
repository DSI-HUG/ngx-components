import { StoryObj } from '@storybook/angular';

import { navPanelArgs, NavPanelComponentType } from '../args/nav-panel.args';
import { navPanelRender } from '../renders/nav-panel.render';

export const navPanelDemo: StoryObj<NavPanelComponentType> = {
    parameters: {
        docs: {
            description: {
                story: 'This story demonstrates the standard usage of `NgxNavIconButtonComponent`.'
            }
        }
    },
    render: navPanelRender({
        expanded: [],
        isContainer: [],
        childrenGroupIds: [],
        groupId: [],
        panelType: [],
        panelTheme: []
    }),
    ...navPanelArgs
};
