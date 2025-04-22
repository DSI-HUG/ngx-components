import { PanelType } from '@hug/ngx-sidenav';
import { StoryObj } from '@storybook/angular';
import { includes } from 'lodash-es';

import { NavPanelComponentType } from '../args/nav-panel.args';
import { sidebarEnums } from '../enums/sidebar.enums';
import {
    sidenavContentAccordion1
} from '../helpers/content-templates/templates/sidenav.content.accordion.item1.template';

export const navPanelDirectiveExpandLink: StoryObj<NavPanelComponentType> = {
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
            includes,
            locationClass: (v: PanelType) =>
                includes(
                    [
                        'open-right',
                        'open-right-m3',
                        'open-right-overlay',
                        'open-right-fixed'
                    ],
                    v
                )
                    ? 'location-left'
                    : 'location-right'
        },
        template: `
    <section class="sidenav nav-panel min600x400">
        <div class="flex flex-row gap-4">
            <div class="flex flex-column gap-4">
                <button mat-stroked-button routerLink="/item1/group1/subgroup1/page1">Chimpanzé 01</button>
                <button mat-stroked-button routerLink="/item1/group1/subgroup2/page1">Mandrill 01</button>
                <button mat-stroked-button routerLink="/item1/group2/page1">Chat</button>
            </div>
            <div class="m3-panel">
                ${sidenavContentAccordion1}
            </div>
        </div>
    </section>

    <!-- # Templates -->
    <content-templates #templates></content-templates>`
    })
};
