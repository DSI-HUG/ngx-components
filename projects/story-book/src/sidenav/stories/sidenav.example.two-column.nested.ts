import { StoryObj } from '@storybook/angular';

import { NgxSidenavComponentType } from '../args/sidenav.args';
import { sidebarEnums } from '../enums/sidebar.enums';
import { getDynamicContent, getDynamicContentTemplates } from '../templates/sidenav.content-dynamic.template';

export const sidenavExampleTwoColumnNested: StoryObj<NgxSidenavComponentType> = {
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
        <ngx-sidenav theme="light" >
            <button nav-button
                routerLink="/item1"
                routerLinkActive="ngx-nav-state-selected"
                [routerLinkActiveOptions]="{exact: false}"
                [navPanel]="panelRight"
                [navPanelContent]="contentAccordion1"
                navAction="open">
                <mat-icon>home</mat-icon> open 1
            </button>
            <button nav-button
                routerLink="/item2"
                routerLinkActive="ngx-nav-state-selected"
                [routerLinkActiveOptions]="{exact: false}"
                [navPanel]="panelRight"
                [navPanelContent]="contentAccordion2"
                navAction="open">
                <mat-icon>countertops</mat-icon> open 2
            </button>
        </ngx-sidenav>
        <!-- # Panels Left -->
        <ngx-nav-panel #panelRight panelType="overlay-open-right"></ngx-nav-panel>
        <div class="flex flex-column flex-auto">
            <!-- # Sidenav -->
            <ngx-sidenav theme="none"
                         location="top">
                <button nav-icon-button
                    matTooltip="Filter"
                    [navPanel]="[panelFilter, panelLeft]"
                    [navPanelContent]="[contentAccordion2]"
                    navAction="toggle">
                    <mat-icon>filter_alt</mat-icon>
                </button>
                <ngx-nav-divider></ngx-nav-divider>
                <button nav-icon-button
                    matTooltip="Prameters"
                    [navPanel]="panelLeft"
                    navAction="toggle">
                    <mat-icon>settings</mat-icon>
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
                                panelType="open-left"
                                panelTheme="none">
                    <ngx-sidenav theme="none"
                                 location="top">
                        <button nav-icon-button
                            matTooltip="Filter"
                            [navPanel]="panelFilter"
                            [navPanelContent]="contentAccordion2"
                            navAction="toggle">
                            <mat-icon>filter_alt</mat-icon>
                        </button>
                        <button nav-icon-button
                            matTooltip="Prameters"
                            [navPanel]="panelTune"
                            [navPanelContent]="contentAccordion1"
                            navAction="toggle">
                            <mat-icon>tune</mat-icon>
                        </button>
                    </ngx-sidenav>
                    <ngx-dynamic-content [navContainer]="true">
                        <div class="flex flex-column w-full gap-4">
                            <div class="px-4"><h4>Settings 1</h4></div>
                            <ngx-dynamic-content #panelFilter></ngx-dynamic-content>
                            <ngx-dynamic-content #panelTune></ngx-dynamic-content>
                        </div>
                    </ngx-dynamic-content>
                    <ngx-sidenav theme="none"
                                 location="top">
                        <div nav-button-group>
                            <button nav-icon-button
                                _name="counter_1"
                                matTooltip="Filter"
                                [navPanel]="history"
                                [navPanelContent]="contentAccordion1"
                                navAction="toggle">
                                <mat-icon>counter_1</mat-icon>
                            </button>
                            <button nav-icon-button
                                _name="counter_2"
                                matTooltip="Prameters"
                                [navPanel]="comment"
                                [navPanelContent]="contentAccordion2"
                                navAction="toggle">
                                <mat-icon>counter_2</mat-icon>
                            </button>
                        </div>
                    </ngx-sidenav>
                    <ngx-dynamic-content [navContainer]="true" _name='settings-2'>
                        <div class="flex flex-column w-full gap-4 px-4">
                            <h4>Settings 2</h4>
                            <ngx-dynamic-content #history _name='history' [navGroup]="1">
                                <h4>History</h4>
                            </ngx-dynamic-content>
                            <ngx-dynamic-content #comment _name='comment' [navGroup]="1">
                                <h4>Comment</h4>
                            </ngx-dynamic-content>
                        </div>
                    </ngx-dynamic-content>
                </ngx-nav-panel>
            </div>
        </div>
    </div>

</section>

<!-- # Templates -->
${getDynamicContentTemplates()}`
    })
};
