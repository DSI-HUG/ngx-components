import { NavPanelComponent, PANEL_THEMES, PANEL_TYPES } from '@hug/ngx-sidenav';
import { StoryObj } from '@storybook/angular';
import { pick } from 'lodash-es';

import { ContentType } from '../helpers/content-templates/content-templates.component';

export type NavPanelComponentType = NavPanelComponent & {
    content: ContentType;
    panelId: string;
    isContainer: boolean;
    expanded: boolean;
    pageSize: string;
};

export const navPanelArgs: StoryObj<NavPanelComponentType> = {
    argTypes: {
        content: {
            description: 'Permet de tester avec différents types de contenu.',
            name: 'Content',
            control: { type: 'select' },
            options: Object.values(ContentType),
            table: {
                category: 'Test',
                defaultValue: { summary: 'TITLE_TEXT' },
                type: { summary: 'ContentType' }
            }
        },
        panelId: {
            description: 'Ajoute le `panel` dans le PanelRegistry',
            control: { type: 'text' },
            table: {
                category: 'Openable',
                defaultValue: { summary: 'undefined' },
                type: { summary: 'string | undefined' }
            }
        },
        expanded: {
            description: 'Est-ce que le panneau est ouvert ?',
            control: { type: 'boolean' },
            table: {
                category: 'Openable',
                defaultValue: { summary: 'undefined' },
                type: { summary: 'boolean | undefined' }
            }
        },
        panelType: {
            description: 'Type d’affichage',
            control: { type: 'select' },
            options: PANEL_TYPES,
            table: {
                category: 'Panel',
                defaultValue: { summary: 'OPEN_RIGHT' },
                type: { summary: 'PanelType' }
            }
        },
        panelTheme: {
            description: 'Style préconfiguré',
            control: { type: 'select' },
            options: PANEL_THEMES,
            table: {
                category: 'Panel',
                defaultValue: { summary: 'MATERIAL_3' },
                type: { summary: 'PanelTheme' }
            }
        },
        groupId: {
            description: 'Permet de préciser manuellement l’identifiant du groupe.',
            control: { type: 'number' },
            table: {
                category: 'Openable',
                defaultValue: { summary: 'undefined' },
                type: { summary: 'number | undefined' }
            }
        },
        isContainer: {
            description: 'Definit si le panneau doit s\'ouvrir quand un panneau est actif.',
            control: { type: 'boolean' },
            table: {
                category: 'Openable',
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        childrenGroupIds: {
            description: 'Permet de préciser manuellement les groupes des enfants si `isContainer` est actif. Sinon, les groupes sont déduits automatiquement.',
            control: { type: 'object' },
            table: {
                category: 'Openable',
                defaultValue: { summary: 'undefined' },
                type: { summary: 'number[] | undefined' }
            }
        },
        pageSize: {
            table: { disable: true }
        }
    },
    args: {
        content: ContentType.NAV_LIST_1,
        panelType: 'open-right-m3',
        panelTheme: 'm3',
        expanded: true,
        isContainer: false,
        pageSize: 'min300x400'
    }
};
export const nav2PanelArgs: StoryObj<NavPanelComponentType> = {
    argTypes: pick(navPanelArgs.argTypes, ['pageSize', 'panelType', 'expanded']),
    args: {
        ...pick(navPanelArgs.args, ['pageSize', 'panelType', 'expanded']),
        content: ContentType.ACCORDION_1,
        pageSize: 'min600x400'
    }
};
export const navPanelScrollArgs: StoryObj<NavPanelComponentType> = {
    argTypes: pick(navPanelArgs.argTypes, ['pageSize', 'panelType', 'expanded']),
    args: {
        ...pick(navPanelArgs.args, ['pageSize', 'panelType', 'expanded']),
        content: ContentType.SCROLL
    }
};
export const navPanelOpenableArgs: StoryObj<NavPanelComponentType> = {
    argTypes: pick(navPanelArgs.argTypes, ['pageSize', 'content', 'expanded', 'isContainer', 'childrenGroupIds', 'groupId']),
    args: {
        ...pick(navPanelArgs.args, ['pageSize', 'content', 'expanded', 'isContainer', 'childrenGroupIds', 'groupId']),
        isContainer: true
    }
};
