import { InputSignal } from '@angular/core';
import { NAV_ITEM_STATES, NAV_ITEM_STYLES, NavButtonComponent, NavItemStyle, SIDEBAR_THEMES } from '@hug/ngx-sidenav';
import { StoryObj } from '@storybook/angular';
import { omit } from 'lodash-es';

export type NavButtonComponentArgs = NavButtonComponent & {
    style: InputSignal<NavItemStyle>;
    selected: InputSignal<boolean>;
    loading: InputSignal<boolean>;
};

export const navButtonComponentArgs: StoryObj<NavButtonComponentArgs> = {
    argTypes: {
        state: {
            description: 'to force the different state of the button',
            control: { type: 'select' },
            options: [
                undefined,
                ...NAV_ITEM_STATES
            ],
            table: {
                defaultValue: { summary: 'undefined' },
                type: { summary: 'NavItemState' }
            }
        },
        theme: {
            description: 'to select a default theme (Dark or Light)',
            control: { type: 'select' },
            options: [
                undefined,
                ...SIDEBAR_THEMES
            ],
            table: {
                defaultValue: { summary: 'undefined' },
                type: { summary: 'NavItemStyle' }
            }
        },
        style: {
            description: 'to select a style (Fill)',
            control: { type: 'select' },
            options: NAV_ITEM_STYLES,
            table: {
                defaultValue: { summary: 'OPEN_RIGHT' },
                type: { summary: 'NavItemStyle' }
            }
        },
        disabled: {
            description: 'to disable the button',
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        loading: {
            description: 'to display the spinner',
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        selected: {
            description: 'to display the selected state',
            table: {
                defaultValue: { summary: 'false' }
            }
        }
    },
    args: {
        state: undefined,
        theme: undefined,
        style: 'none',
        disabled: false,
        selected: false,
        loading: true
    }
};
export const navButtonDirectiveArgs: StoryObj<NavButtonComponentArgs> = {
    argTypes: {
        ...omit(navButtonComponentArgs.argTypes, [
            'loading'
        ]),
        loading: {
            name: 'loading (only on Component)',
            description: 'to display the spinner',
            table: {
                defaultValue: { summary: 'false' }
            }
        }
    },
    args: omit(navButtonComponentArgs.args, [
        'loading'
    ])
};
