import { StoryObj } from '@storybook/angular';

import { navPanelArgs, NgxNavPanelComponentType } from '../args/nav-panel.args';
import { sidebarEnums } from '../enums/sidebar.enums';
import { sidenavLayout } from '../templates/sidenav.layout.template';

export const navPanelStandard: StoryObj<NgxNavPanelComponentType> = {
    parameters: {
        docs: {
            description: {
                story: 'This story demonstrates the standard usage of `NgxNavIconButtonComponent`.'
            }
        }
    },
    render: args => ({
        props: {
            ...args,
            ...sidebarEnums
        },
        template: `
<section class="sidenav nav-panel min300x400 fullscreen" [class]="'location-'+panel.location()">
    ${sidenavLayout(`
    <ngx-nav-panel #panel [expanded]="expanded" [panelType]="panelType" [panelTheme]="panelTheme">
        <h1>Panel 1</h1>
        Lorem ipsum dolor sit amet...
    </ngx-nav-panel>`)}
</section>`
    }),
    ...navPanelArgs
};
