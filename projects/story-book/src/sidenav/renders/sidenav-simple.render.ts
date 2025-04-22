import { NavJustify, NavSize, SidebarLocation, SidebarTheme } from '@hug/ngx-sidenav';
import { StoryObj } from '@storybook/angular';
import { first, includes, isArray } from 'lodash-es';

import { sidebarEnums } from '../enums/sidebar.enums';
import { ContentType } from '../helpers/content-templates/content-templates.component';
import { sidenavContentTitleText } from '../helpers/content-templates/templates/sidenav.content.text.template';
import { renderTools } from './render.tools';


export interface SidenavTemplateArgs {
    buttons?: string;
    panels?: string;
    container?: string;
    templates?: string;
    routerLink?: boolean;
    navAction1?: string | [string] | [];
    navActionContainer1?: string | [string] | [];
    navActionContent1?: ContentType | [string] | [];
    navActionGroup1?: string | [string] | [];
    navAction2?: string | [string] | [];
    navActionContainer2?: string | [string] | [];
    navActionContent2?: ContentType | [string] | [];
    navActionGroup2?: string | [string] | [];
    pageSize?: string | [string] | [];
    location?: SidebarLocation | [string] | [];
    theme?: SidebarTheme | [string] | [];
    disabled?: boolean | [string] | [];
    navSize?: NavSize | [string] | [];
    navJustify?: NavJustify | [string] | [];
}

export const sidenavSimpleRender = (renderArgs: SidenavTemplateArgs = {}): StoryObj['render'] => args => {
    const {
        buttons,
        panels,
        container,
        navActionGroup1,
        navActionGroup2,
        pageSize,
        location,
        disabled,
        navSize,
        navJustify
    } = renderArgs;
    const routerLink = renderArgs.routerLink ?? true;
    const theme = renderArgs.theme ?? 'dark';
    const navAction1 = renderArgs.navAction1 ?? 'open';
    const navActionContainer1 = renderArgs.navActionContainer1 ?? ['panelRight'];
    const navActionContent1 = renderArgs.navActionContent1 ?? ['templates.contentAccordion1()'];
    const navAction2 = renderArgs.navAction2 ?? 'open';
    const navActionContainer2 = renderArgs.navActionContainer2 ?? ['panelRight'];
    const navActionContent2 = renderArgs.navActionContent2 ?? ['templates.contentAccordion2()'];

    const { property, refs, template } = renderTools;
    const isNeedSidebarInstance = isArray(location);
    const classLocation = ((): string | undefined => {
        if (isArray(location)) {
            return `[class]="'location-' + ${first(location) ?? 'location'} + ' direction-' + sidenav.direction()"`;
        } else if (location) {
            return `[class]="'location-${location}' '${['left', 'right'].includes(location) ? 'direction-vertical' : 'direction-horizontal'}'"`;
        } else {
            return undefined;
        }
    })();

    const classSection = ((): string => {
        if (isArray(pageSize)) {
            return `[class]="${first(pageSize) ?? 'pageSize'}"`;
        } else {
            return '[class]="\'min600x400\'"';
        }
    })();
    return {
        props: {
            ...args,
            ...sidebarEnums,
            includes
        },
        template: `
        <section class="sidenav nav-sidenav" ${classSection}>
            <!-- Page -->
            <div class="page" ${classLocation}>
                <!-- # Sidenav -->
                <ngx-sidenav ${isNeedSidebarInstance ? '#sidenav' : ''}
                            ${property('location', location)}
                            ${property('theme', theme)}
                            ${property('disabled', disabled)}
                            ${property('navSize', navSize)}
                            ${property('navJustify', navJustify)}>
                    ${buttons ?? `<button nav-button
                                ${routerLink ? `
                                routerLink="/item1"
                                routerLinkActive="ngx-nav-state-selected"
                                [routerLinkActiveOptions]="{exact: false}"` : ''}
                                ${property('navAction', navAction1)}
                                ${refs('navActionContainer', navActionContainer1)}
                                ${template('navActionContent', navActionContent1)}
                                ${property('navActionGroup', navActionGroup1)}>
                                <mat-icon>filter_drama</mat-icon> Cloud
                            </button>
                            <button nav-button
                                ${routerLink ? `
                                routerLink="/item2"
                                routerLinkActive="ngx-nav-state-selected"
                                [routerLinkActiveOptions]="{exact: false}"` : ''}
                                ${property('navAction', navAction2)}
                                ${refs('navActionContainer', navActionContainer2)}
                                ${template('navActionContent', navActionContent2)}
                                ${property('navActionGroup', navActionGroup2)}>
                                <mat-icon>palette</mat-icon> Palette
                            </button>`
                    }
                </ngx-sidenav>

                ${container ?? `<div class="page-container">
                        <!-- # Panels -->
                        <div class="panels">
                        ${panels ?? '<ngx-nav-panel #panelRight></ngx-nav-panel>'}
                        </div>
                        <!-- # Content -->
                        <div class="content">
                            ${sidenavContentTitleText()}
                        </div>
                    </div>`
                }
            </div>

        </section>

        <!-- # Templates -->
        <content-templates #templates></content-templates>`
    };
};

export const sidenavHorizontalTemplate = (params: SidenavTemplateArgs = {}): StoryObj['render'] => sidenavSimpleRender({
    ...params,
    buttons: `<button nav-icon-button
                    navAction="toggle"
                    [navActionContainer]="panelRight"
                    [navActionContent]="templates.getRef(ContentType.ACCORDION_1)"
                    matTooltip="filter">
                    <mat-icon>filter_alt</mat-icon>
                </button>
                <button nav-icon-button
                    navAction="toggle"
                    [navActionContainer]="panelLeft"
                    [navActionContent]="templates.getRef(ContentType.ACCORDION_2)"
                    matTooltip="settings">
                    <mat-icon>settings</mat-icon>
                </button>`,
    container: `<div class="page-container">
                <div>
                    <ngx-nav-panel #panelRight panelType="open-right-overlay"></ngx-nav-panel>
                </div>
                <!-- # Content -->
                <div class="content">
                    ${sidenavContentTitleText()}
                </div>
                <div>
                    <ngx-nav-panel #panelLeft panelType="open-left-m3"></ngx-nav-panel>
                </div>
            </div>`
});
