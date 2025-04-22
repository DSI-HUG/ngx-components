import { StoryObj } from '@storybook/angular';
import { compact, includes, pick } from 'lodash-es';

import { sidebarEnums } from '../enums/sidebar.enums';
import { renderTools } from './render.tools';
import { sidenavParts } from './templates/sidenav.horizontal.content.template';

interface FeatureArg {
    navButtonStyle?: string | [string] | [];
}

export const navButtonStatesRender = (feature?: FeatureArg): StoryObj['render'] => args => {
    const isFeatureNavButtonStyleActive = !!feature?.navButtonStyle;
    const navButtonStyleArgs = pick(feature, ['navButtonStyle']);
    const { property } = renderTools;
    const templateDefaultDirective = ({ navButtonStyle }: FeatureArg = {}): string => `
            <button nav-button state="enabled" ${property('navButtonStyle', navButtonStyle)}>
                <mat-icon>menu_open</mat-icon> enabled
            </button>
            <button nav-button state="disabled" ${property('navButtonStyle', navButtonStyle)}>
                <mat-icon>menu_open</mat-icon> disabled
            </button>
            <button nav-button state="pressed" ${property('navButtonStyle', navButtonStyle)}>
                <mat-icon>menu_open</mat-icon> pressed
            </button>
            <button nav-button state="focused" ${property('navButtonStyle', navButtonStyle)}>
                <mat-icon>menu_open</mat-icon> focused
            </button>
            <button nav-button state="hovered" ${property('navButtonStyle', navButtonStyle)}>
                <mat-icon>menu_open</mat-icon> hovered
            </button>`;

    const templateDefaultComponent = ({ navButtonStyle }: FeatureArg = {}): string => `
            <ngx-nav-button state="enabled" ${property('navButtonStyle', navButtonStyle)}>
                <mat-icon>menu_open</mat-icon> enabled
            </ngx-nav-button>
            <ngx-nav-button state="disabled" ${property('navButtonStyle', navButtonStyle)}>
                <mat-icon>menu_open</mat-icon> disabled
            </ngx-nav-button>
            <ngx-nav-button state="pressed" ${property('navButtonStyle', navButtonStyle)}>
                <mat-icon>menu_open</mat-icon> pressed
            </ngx-nav-button>
            <ngx-nav-button state="focused" ${property('navButtonStyle', navButtonStyle)}>
                <mat-icon>menu_open</mat-icon> focused
            </ngx-nav-button>
            <ngx-nav-button state="hovered" ${property('navButtonStyle', navButtonStyle)}>
                <mat-icon>menu_open</mat-icon> hovered
            </ngx-nav-button>`;

    const templateIconDefaultDirective = ({ navButtonStyle }: FeatureArg = {}): string => `
            <button nav-icon-button state="enabled" matTooltip="enabled"  ${property('navButtonStyle', navButtonStyle)}>
                <mat-icon>menu_open</mat-icon>
            </button>
            <button nav-icon-button state="disabled" matTooltip="disabled"  ${property('navButtonStyle', navButtonStyle)}>
                <mat-icon>menu_open</mat-icon>
            </button>
            <button nav-icon-button state="pressed" matTooltip="pressed"  ${property('navButtonStyle', navButtonStyle)}>
                <mat-icon>menu_open</mat-icon>
            </button>
            <button nav-icon-button state="focused" matTooltip="focused"  ${property('navButtonStyle', navButtonStyle)}>
                <mat-icon>menu_open</mat-icon>
            </button>
            <button nav-icon-button state="hovered" matTooltip="hovered" ${property('navButtonStyle', navButtonStyle)} >
                <mat-icon>menu_open</mat-icon>
            </button>`;

    const templateIconDefaultComponent = ({ navButtonStyle }: FeatureArg = {}): string => `
            <ngx-nav-icon-button state="enabled" matTooltip="enabled" ${property('navButtonStyle', navButtonStyle)}>
                <mat-icon>menu_open</mat-icon>
            </ngx-nav-icon-button>
            <ngx-nav-icon-button state="disabled" matTooltip="disabled" ${property('navButtonStyle', navButtonStyle)}>
                <mat-icon>menu_open</mat-icon>
            </ngx-nav-icon-button>
            <ngx-nav-icon-button state="pressed" matTooltip="pressed" ${property('navButtonStyle', navButtonStyle)}>
                <mat-icon>menu_open</mat-icon>
            </ngx-nav-icon-button>
            <ngx-nav-icon-button state="focused" matTooltip="focused" ${property('navButtonStyle', navButtonStyle)}>
                <mat-icon>menu_open</mat-icon>
            </ngx-nav-icon-button>
            <ngx-nav-icon-button state="hovered" matTooltip="hovered" ${property('navButtonStyle', navButtonStyle)}>
                <mat-icon>menu_open</mat-icon>
            </ngx-nav-icon-button>`;
    return ({
        props: {
            ...args,
            ...sidebarEnums,
            includes
        },
        template: `
    <section class="sidenav nav-button">
        ${sidenavParts(
            [
                {
                    partTitle: 'NavButton > Directive',
                    if: 'includes(["all", "nav-button"], navButtonVersion) && includes(["all", "directive"], navButtonType)',
                    content: compact([
                        {
                            contentTitle: 'Default',
                            value: `<ngx-sidenav>
                                ${templateDefaultDirective()}
                            </ngx-sidenav>`
                        },
                        isFeatureNavButtonStyleActive ? {
                            contentTitle: 'With Style',
                            value: `<ngx-sidenav>
                                ${templateDefaultDirective(navButtonStyleArgs)}
                            </ngx-sidenav>`
                        } : undefined,
                        {
                            contentTitle: 'Light',
                            value: `<ngx-sidenav theme="light">
                                ${templateDefaultDirective()}
                            </ngx-sidenav>`
                        },
                        isFeatureNavButtonStyleActive ? {
                            contentTitle: 'Light with Style',
                            value: `<ngx-sidenav theme="light">
                                ${templateDefaultDirective(navButtonStyleArgs)}
                            </ngx-sidenav>`
                        } : undefined,
                        {
                            contentTitle: 'Dark',
                            value: `<ngx-sidenav theme="dark">
                                ${templateDefaultDirective()}
                            </ngx-sidenav>`
                        },
                        isFeatureNavButtonStyleActive ? {
                            contentTitle: 'Dark with Style',
                            value: `<ngx-sidenav theme="dark">
                                ${templateDefaultDirective(navButtonStyleArgs)}
                            </ngx-sidenav>`
                        } : undefined
                    ])
                },
                {
                    partTitle: 'NavButton > Component',
                    if: 'includes(["all", "nav-button"], navButtonVersion) && includes(["all", "component"], navButtonType)',
                    content: compact([
                        {
                            contentTitle: 'Default',
                            value: `<ngx-sidenav>
                                ${templateDefaultComponent()}
                            </ngx-sidenav>`
                        },
                        isFeatureNavButtonStyleActive ? {
                            contentTitle: 'Fill',
                            value: `<ngx-sidenav>
                                ${templateDefaultComponent(navButtonStyleArgs)}
                            </ngx-sidenav>`
                        } : undefined,
                        {
                            contentTitle: 'Light Default',
                            value: `<ngx-sidenav theme="light">
                                ${templateDefaultComponent()}
                            </ngx-sidenav>`
                        },
                        isFeatureNavButtonStyleActive ? {
                            contentTitle: 'Light',
                            value: `<ngx-sidenav  theme="light">
                                ${templateDefaultComponent(navButtonStyleArgs)}
                            </ngx-sidenav>`
                        } : undefined,
                        {
                            contentTitle: 'Dark Default',
                            value: `<ngx-sidenav theme="dark">
                                ${templateDefaultComponent()}
                            </ngx-sidenav>`
                        },
                        isFeatureNavButtonStyleActive ? {
                            contentTitle: 'Dark',
                            value: `<ngx-sidenav theme="dark">
                                ${templateDefaultComponent(navButtonStyleArgs)}
                            </ngx-sidenav>`
                        } : undefined
                    ])
                },
                {
                    partTitle: 'NavIconButton > Directive',
                    if: 'includes(["all", "nav-icon-button"], navButtonVersion) && includes(["all", "directive"], navButtonType)',
                    content: compact([
                        {
                            contentTitle: 'Default',
                            value: `<ngx-sidenav>
                                ${templateIconDefaultDirective()}
                            </ngx-sidenav>`
                        },
                        isFeatureNavButtonStyleActive ? {
                            contentTitle: 'Fill',
                            value: `<ngx-sidenav>
                                ${templateIconDefaultDirective(navButtonStyleArgs)}
                            </ngx-sidenav>`
                        } : undefined,
                        {
                            contentTitle: 'Light',
                            value: `<ngx-sidenav theme="light">
                                ${templateIconDefaultDirective()}
                            </ngx-sidenav>`
                        },
                        isFeatureNavButtonStyleActive ? {
                            contentTitle: 'Light Fill',
                            value: `<ngx-sidenav theme="light">
                                ${templateIconDefaultDirective(navButtonStyleArgs)}
                            </ngx-sidenav>`
                        } : undefined,
                        {
                            contentTitle: 'Dark',
                            value: `<ngx-sidenav theme="dark">
                                ${templateIconDefaultDirective()}
                            </ngx-sidenav>`
                        },
                        isFeatureNavButtonStyleActive ? {
                            contentTitle: 'Dark Fill',
                            value: `<ngx-sidenav theme="dark">
                                ${templateIconDefaultDirective(navButtonStyleArgs)}
                            </ngx-sidenav>`
                        } : undefined
                    ])
                },
                {
                    partTitle: 'NavIconButton > Component',
                    if: 'includes(["all", "nav-icon-button"], navButtonVersion) && includes(["all", "component"], navButtonType)',
                    content: compact([
                        {
                            contentTitle: 'Default',
                            value: `<ngx-sidenav>
                                ${templateIconDefaultComponent()}
                            </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Fill',
                            value: `<ngx-sidenav>
                                ${templateIconDefaultComponent(navButtonStyleArgs)}
                            </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Light Default',
                            value: `<ngx-sidenav theme="light">
                                ${templateIconDefaultComponent()}
                            </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Light',
                            value: `<ngx-sidenav  theme="light">
                                ${templateIconDefaultComponent(navButtonStyleArgs)}
                            </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Dark Default',
                            value: `<ngx-sidenav theme="dark">
                                ${templateIconDefaultComponent()}
                            </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Dark',
                            value: `<ngx-sidenav theme="dark">
                                ${templateIconDefaultComponent(navButtonStyleArgs)}
                            </ngx-sidenav>`
                        }
                    ])
                }
            ],
            'vertical'
        )}
    </section>`
    });
};
