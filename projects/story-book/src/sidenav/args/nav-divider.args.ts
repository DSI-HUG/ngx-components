import { NavDividerComponent, SIDEBAR_DIRECTIONS, SIDEBAR_THEMES } from '@hug/ngx-sidenav';
import { StoryObj } from '@storybook/angular';

export type NavDividerComponentArgs = NavDividerComponent & {
    pageSize: string;
};


export const navDividerArgs: StoryObj<NavDividerComponentArgs> = {
    argTypes: {
        direction: {
            description: 'to select the orientation (Horizontal or Vertical)',
            control: { type: 'select' },
            options: SIDEBAR_DIRECTIONS,
            table: {
                defaultValue: { summary: 'undefined' },
                type: { summary: 'SidebarDirection' }
            }
        },
        theme: {
            description: 'to select a default theme (Dark or Light)',
            control: { type: 'select' },
            options: SIDEBAR_THEMES,
            table: {
                defaultValue: { summary: 'undefined' },
                type: { summary: 'SidebarTheme' }
            }
        },
        pageSize: { table: { disable: true } }
    },
    args: {
        direction: undefined,
        theme: 'light',
        pageSize: 'min300x300'
    }
};

