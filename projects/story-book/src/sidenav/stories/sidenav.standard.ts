import { StoryObj } from '@storybook/angular';

import { NgxSidenavComponentType, sidenavArgs } from '../args/sidenav.args';
import { sidebarEnums } from '../enums/sidebar.enums';
import { sidenavTemplate } from '../templates/sidenav.template';

export const sidenavStandard: StoryObj<NgxSidenavComponentType> = {
    parameters: {
        docs: {
            description: {
                story: 'This story demonstrates the standard usage of `SidenavComponent`.'
            }
        }
    },
    render: args => ({
        props: {
            ...args,
            ...sidebarEnums
        },
        template: sidenavTemplate()
    }),
    ...sidenavArgs
};
