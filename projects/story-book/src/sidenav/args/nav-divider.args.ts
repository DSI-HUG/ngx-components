import { NavDividerComponent, SidebarDirection, SidebarTheme } from '@hug/ngx-sidenav';
import { StoryObj } from '@storybook/angular';

export const navDividerArgs: StoryObj<NavDividerComponent> = {
    argTypes: {
        direction: {
            description: 'to select the orientation (Horizontal or Vertical)',
            control: { type: 'select' },
            options: Object.values(SidebarDirection),
            table: {
                defaultValue: { summary: 'undefined' },
                type: { summary: 'SidebarDirection' }
            }
        },
        theme: {
            description: 'to select a default theme (Dark or Light)',
            control: { type: 'select' },
            options: Object.values(SidebarTheme),
            table: {
                defaultValue: { summary: 'undefined' },
                type: { summary: 'SidebarTheme' }
            }
        }
    },
    args: {
        direction: undefined,
        theme: undefined
    }
};
