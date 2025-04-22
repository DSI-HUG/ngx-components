import { InputSignal } from '@angular/core';
import {
    NAV_ACTIONS,
    NAV_BUTTON_STATES,
    NAV_BUTTON_STYLES,
    NavAction,
    NavButtonComponent,
    NavButtonStyle,
    SIDEBAR_THEMES
} from '@hug/ngx-sidenav';
import { StoryObj } from '@storybook/angular';
import { omit } from 'lodash-es';

import {
    ContentType,
    NAV_ACTION_CONTENT,
    NavActionContent
} from '../helpers/content-templates/content-templates.component';
import { NAV_ACTION_CONTAINER, NavActionContainer } from '../helpers/enums/nav-action.types';
import { NAV_BUTTON_TYPE_WITH_ALL, NavButtonTypeWithAll } from '../helpers/enums/nav-button.type';
import { NAV_BUTTON_VERSION_WITH_ALL, NavButtonVersionWithAll } from '../helpers/enums/nav-button.version';

export type NavButtonComponentArgs = NavButtonComponent & {
    selected: InputSignal<boolean>;
    loading: InputSignal<boolean>;
    navButtonType: NavButtonTypeWithAll;
    navButtonStyle: NavButtonStyle;
    navButtonVersion: NavButtonVersionWithAll;
    pageSize: string;
    navAction1: NavAction;
    navActionContainer1: NavActionContainer;
    navActionContent1: NavActionContent;
    navActionGroup1: number | undefined;
    navAction2: NavAction;
    navActionContainer2: NavActionContainer;
    navActionContent2: NavActionContent;
    navActionGroup2: number | undefined;
};

const loadingArg = {
    description: 'to display the spinner',
    table: {
        category: 'Component',
        defaultValue: { summary: 'false' }
    }
};

export const navButtonComponentArgs: StoryObj<NavButtonComponentArgs> = {
    argTypes: {
        state: {
            description: 'to force the different state of the button',
            control: { type: 'select' },
            options: [
                undefined,
                ...NAV_BUTTON_STATES
            ],
            table: {
                category: 'Test',
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
                category: 'Inputs',
                defaultValue: { summary: 'undefined' },
                type: { summary: 'NavButtonStyle' }
            }
        },
        disabled: {
            description: 'to disable the button',
            table: {
                category: 'Inputs',
                defaultValue: { summary: 'false' }
            }
        },
        loading: loadingArg,
        selected: {
            description: 'to display the selected state',
            table: {
                category: 'Inputs',
                defaultValue: { summary: 'false' }
            }
        },
        pageSize: { table: { disable: true } }
    },
    args: {
        theme: undefined,
        selected: false,
        disabled: false,
        loading: false,
        pageSize: 'min600x400',
        state: undefined
    }
};
export const navButtonDirectiveArgs: StoryObj<NavButtonComponentArgs> = {
    argTypes: {
        ...omit(navButtonComponentArgs.argTypes, [
            'loading'
        ])
    },
    args: {
        ...omit(navButtonComponentArgs.args, [
            'loading'
        ])
    }
};
export const navButtonVersionArgs: StoryObj<NavButtonComponentArgs> = {
    argTypes: {
        navButtonVersion: {
            name: 'version',
            description: 'Version de `nav-button`',
            control: { type: 'select' },
            options: NAV_BUTTON_VERSION_WITH_ALL,
            table: {
                category: 'NavButton',
                defaultValue: { summary: '"all"' }
            }
        }
    },
    args: {
        navButtonVersion: 'nav-button'
    }
};

export const navButtonTypeVersionArgs: StoryObj<NavButtonComponentArgs> = {
    argTypes: {
        navButtonType: {
            name: 'type',
            description: 'Type de `nav-button`',
            control: { type: 'select' },
            options: NAV_BUTTON_TYPE_WITH_ALL,
            table: {
                category: 'NavButton',
                defaultValue: { summary: '"all"' }
            }
        },
        ...navButtonVersionArgs.argTypes
    },
    args: {
        navButtonType: 'directive',
        ...navButtonVersionArgs.args
    }
};

export const navButtonStyleArgs: StoryObj<NavButtonComponentArgs> = {
    argTypes: {
        navButtonStyle: {
            name: 'style',
            description: 'Style de `nav-button`',
            control: { type: 'select' },
            options: NAV_BUTTON_STYLES,
            table: {
                category: 'NavButtonStyle',
                defaultValue: { summary: '"none"' }
            }
        },
        ...navButtonTypeVersionArgs.argTypes
    },
    args: {
        navButtonStyle: 'fill',
        ...navButtonTypeVersionArgs.args
    }
};
export const navButtonDemoArgs: StoryObj<NavButtonComponentArgs> = {
    argTypes: {
        ...navButtonTypeVersionArgs.argTypes,
        ...navButtonComponentArgs.argTypes
    },
    args: {
        ...navButtonTypeVersionArgs.args,
        ...navButtonComponentArgs.args,
        pageSize: 'min300x300'
    }
};

export const navButtonDirectiveActionArgs: StoryObj<NavButtonComponentArgs> = {
    argTypes: {
        navAction1: {
            description: 'to select action type',
            control: { type: 'select' },
            options: [
                undefined,
                ...NAV_ACTIONS
            ],
            table: {
                category: 'Button1',
                type: { summary: 'NavAction' }
            }
        },
        navActionContainer1: {
            description: 'to select the container component',
            control: { type: 'select' },
            options: [
                undefined,
                ...NAV_ACTION_CONTAINER
            ],
            table: {
                category: 'Button1',
                defaultValue: { summary: 'undefined' },
                type: { summary: 'OpenableComponent | OpenableComponent[] | undefined' }
            }
        },
        navActionContent1: {
            description: 'to select action content',
            control: { type: 'select' },
            options: [
                undefined,
                ...NAV_ACTION_CONTENT
            ],
            table: {
                category: 'Button1',
                defaultValue: { summary: 'undefined' },
                type: { summary: 'TemplateRef | TemplateRef[] | undefined' }
            }
        },
        navActionGroup1: {
            description: 'pour definir le numero de group de maniére static',
            control: { type: 'number', optional: true },
            table: {
                category: 'Button1',
                defaultValue: { summary: 'undefined' },
                type: { summary: 'number' }
            }
        },
        navAction2: {
            description: 'to select action type',
            control: { type: 'select' },
            options: [
                undefined,
                ...NAV_ACTIONS
            ],
            table: {
                category: 'Button2',
                type: { summary: 'NavAction' }
            }
        },
        navActionContainer2: {
            description: 'to select the container component',
            control: { type: 'select' },
            options: [
                undefined,
                ...NAV_ACTION_CONTAINER
            ],
            table: {
                category: 'Button2',
                defaultValue: { summary: 'undefined' },
                type: { summary: 'OpenableComponent | OpenableComponent[] | undefined' }
            }
        },
        navActionContent2: {
            description: 'to select action content',
            control: { type: 'select' },
            options: [
                undefined,
                ...NAV_ACTION_CONTENT
            ],
            table: {
                category: 'Button2',
                defaultValue: { summary: 'undefined' },
                type: { summary: 'TemplateRef | TemplateRef[] | undefined' }
            }
        },
        navActionGroup2: {
            description: 'pour definir le numero de group de maniére static',
            control: { type: 'number', optional: true },
            table: {
                category: 'Button2',
                defaultValue: { summary: 'undefined' },
                type: { summary: 'number' }
            }
        },
        pageSize: { table: { disable: true } }
    },
    args: {
        navAction1: 'open',
        navActionContainer1: 'panelRight',
        navActionContent1: ContentType.ACCORDION_1,
        navActionGroup1: undefined,
        navAction2: 'open',
        navActionContainer2: 'panelRight',
        navActionContent2: ContentType.ACCORDION_2,
        navActionGroup2: undefined,
        pageSize: 'min600x400'
    }
};
