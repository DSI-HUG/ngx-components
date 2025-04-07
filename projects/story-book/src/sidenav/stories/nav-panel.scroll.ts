import { StoryObj } from '@storybook/angular';
import { times } from 'lodash-es';

import { navPanelArgs, NgxNavPanelComponentType } from '../args/nav-panel.args';
import { sidebarEnums } from '../enums/sidebar.enums';
import { getDynamicContent, getDynamicContentTemplates } from '../templates/sidenav.content-dynamic.template';
import { sidenavLayout } from '../templates/sidenav.layout.template';

export const navPanelScroll: StoryObj<NgxNavPanelComponentType> = {
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
            ...sidebarEnums,
            times
        },
        template: `
<section class="sidenav nav-panel min300x400 fullscreen" [class]="'location-'+panel.location()">
    ${sidenavLayout(`
    <ngx-nav-panel #panel [expanded]="expanded" [panelType]="panelType" [panelTheme]="panelTheme">
        ${getDynamicContent('ContentType.SCROLL')}
    </ngx-nav-panel>`)}
    <!-- # Templates -->
    ${getDynamicContentTemplates()}
</section>`
    }),
    ...navPanelArgs
};
