import { StoryObj } from '@storybook/angular';

import { NgxSidenavComponentType, sidenavArgs } from '../args/sidenav.args';
import { sidebarEnums } from '../enums/sidebar.enums';
import { sidenavHorizontalTemplate } from '../templates/sidenav.template';

export const sidenavHorizontal: StoryObj<NgxSidenavComponentType> = {
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
        template: sidenavHorizontalTemplate()
    }),
    ...{
        ...sidenavArgs,
        args: {
            ...sidenavArgs.args,
            location: 'top'
        }
    }
};
