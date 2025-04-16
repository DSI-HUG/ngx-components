import { StoryObj } from '@storybook/angular';

import { NgxSidenavComponentType, sidenavArgs } from '../args/sidenav.args';
import { sidebarEnums } from '../enums/sidebar.enums';
import { getDynamicContent } from '../templates/sidenav.content-dynamic.template';
import { sidenavTemplate } from '../templates/sidenav.template';

export const sidenavGroups: StoryObj<NgxSidenavComponentType> = {
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
        template: sidenavTemplate({
            buttons: `<button nav-button
                        [navPanel]="panelOpenLeft1"
                        navAction="open">
                        <mat-icon>group</mat-icon> Panel 1
                    </button>
                    <button nav-button
                        [navPanel]="panelOpenLeft2"
                        navAction="open">
                        <mat-icon>group</mat-icon> Panel 2
                    </button>`,
            panels: `<ngx-nav-panel #panelOpenLeft1 panelType="open-left" [navGroup]="1">
                        ${getDynamicContent('ContentType.TITLE_TEXT')}
                    </ngx-nav-panel>
                    <ngx-nav-panel #panelOpenLeft2 panelType="open-left" [navGroup]="1">
                        ${getDynamicContent('ContentType.NAV_LIST_1')}
                    </ngx-nav-panel>`
        })
    }),
    ...sidenavArgs
};
