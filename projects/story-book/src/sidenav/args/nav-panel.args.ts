import { NavPanelComponent, PanelTheme, PanelType } from '@hug/ngx-sidenav';
import { StoryObj } from '@storybook/angular';

import { ContentType } from '../enums/content.type';

export type NgxNavPanelComponentType = NavPanelComponent & { content: ContentType };

export const navPanelArgs: StoryObj<NgxNavPanelComponentType> = {
    argTypes: {
        panelType: {
            control: { type: 'select' },
            options: Object.values(PanelType),
            table: {
                defaultValue: { summary: 'OPEN_RIGHT' },
                type: { summary: 'PanelType' }
            }
        },
        panelTheme: {
            control: { type: 'select' },
            options: Object.values(PanelTheme),
            table: {
                defaultValue: { summary: 'MATERIAL_3' },
                type: { summary: 'PanelType' }
            }
        },
        content: {
            name: 'Tests / Content',
            control: { type: 'select' },
            options: Object.values(ContentType),
            table: {
                defaultValue: { summary: 'TITLE_TEXT' },
                type: { summary: 'ContentType' }
            }
        }
    },
    args: {
        panelType: PanelType.OPEN_RIGHT,
        panelTheme: PanelTheme.MATERIAL_3,
        expanded: true,
        content: ContentType.NAV_LIST_1
    }
};
