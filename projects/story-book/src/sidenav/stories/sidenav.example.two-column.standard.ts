import { StoryObj } from '@storybook/angular';

import { NgxSidenavComponentType } from '../args/sidenav.args';
import { sidebarEnums } from '../enums/sidebar.enums';
import { getDynamicContent, getDynamicContentTemplates } from '../templates/sidenav.content-dynamic.template';

export const sidenavExampleTwoColumnStandard: StoryObj<NgxSidenavComponentType> = {
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
        template: `
<section class="sidenav nav-sidenav min600x400">
    <!-- Page -->
    <div class="page">
        <!-- # Sidenav -->
        <ngx-sidenav [theme]="SidebarTheme.LIGHT" >
            <button nav-button
                routerLink="/item1"
                routerLinkActive="ngx-nav-state-selected"
                [routerLinkActiveOptions]="{exact: false}"
                [navPanel]="panelRight"
                [navPanelContent]="contentAccordion1"
                [navAction]="NavAction.OPEN">
                <mat-icon>bedroom_baby</mat-icon> open 1
            </button>
            <button nav-button
                routerLink="/item2"
                routerLinkActive="ngx-nav-state-selected"
                [routerLinkActiveOptions]="{exact: false}"
                [navPanel]="panelRight"
                [navPanelContent]="contentAccordion2"
                [navAction]="NavAction.OPEN">
                <mat-icon>nest_farsight_weather</mat-icon> open 2
            </button>
        </ngx-sidenav>
        <!-- # Panels Left -->
        <ngx-nav-panel #panelRight [panelType]="PanelType.OVERLAY_OPEN_RIGHT"></ngx-nav-panel>
        <div class="flex flex-column flex-auto">
            <!-- # Sidenav -->
            <ngx-sidenav [theme]="SidebarTheme.NONE"
                         [location]="SidebarLocation.TOP">
                <button nav-icon-button
                    matTooltip="Filter"
                    [navPanel]="panelFilter"
                    [navPanelContent]="contentAccordion2"
                    [navAction]="NavAction.TOGGLE">
                    <mat-icon>filter_alt</mat-icon>
                </button>
                <button nav-icon-button
                    matTooltip="Prameters"
                    [navPanel]="panelTune"
                    [navPanelContent]="contentAccordion1"
                    [navAction]="NavAction.TOGGLE">
                    <mat-icon>tune</mat-icon>
                </button>
            </ngx-sidenav>
            <div class="flex flex-row flex-auto">

                <div class="page-container">
                    <!-- # Content -->
                    <div class="content">
                        ${getDynamicContent('ContentType.TITLE_TEXT')}
                    </div>
                </div>
                <!-- # Panels Right () -->
                 <ngx-nav-panel #panelLeft
                                [navContainer]="true"
                                [panelType]="PanelType.OPEN_LEFT"
                                [panelTheme]="PanelTheme.NONE">
                    <div class="flex flex-column w-full gap-4">
                        <ngx-dynamic-content #panelFilter></ngx-dynamic-content>
                        <ngx-dynamic-content #panelTune></ngx-dynamic-content>
                    </div>
                </ngx-nav-panel>
            </div>
        </div>
    </div>

</section>

<!-- # Templates -->
${getDynamicContentTemplates()}`
    })
};
