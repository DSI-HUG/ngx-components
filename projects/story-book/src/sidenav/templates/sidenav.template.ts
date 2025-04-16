import { NavJustify, NavSize, SidebarLocation } from '@hug/ngx-sidenav';

import { getDynamicContent, getDynamicContentTemplates } from './sidenav.content-dynamic.template';

export const sidenavTemplate = ({ buttons, panels, location, navSize, navJustify }: {
    buttons?: string;
    panels?: string;
    location?: SidebarLocation;
    navSize?: NavSize;
    navJustify?: NavJustify;
} = {}): string => `
    <section class="sidenav nav-sidenav" [class]="pageSize ?? 'min600x400'">
        <!-- Page -->
        <div class="page" [class]="'direction-' + sidenav.direction() + ' location-' + ${location ?? 'location'}">
            <!-- # Sidenav -->
            <ngx-sidenav #sidenav
                        [location]="location"
                        [theme]="theme"
                        [disabled]="disabled"
                        ${navSize ? `[navSize]="navSize ?? ${navSize}"` : ''}
                        ${navJustify ? `[navJustify]="navJustify ?? ${navJustify}"` : ''}>
                ${buttons ?? `<button nav-button
                            routerLink="/item1"
                            routerLinkActive="ngx-nav-state-selected"
                            [routerLinkActiveOptions]="{exact: false}"
                            [navPanel]="panelRight"
                            [navPanelContent]="contentAccordion1"
                            navAction="open">
                            <mat-icon>filter_drama</mat-icon> Cloud
                        </button>
                        <button nav-button
                            routerLink="/item2"
                            routerLinkActive="active-link"
                            [routerLinkActiveOptions]="{exact: false}"
                            [navPanel]="panelRight"
                            [navPanelContent]="contentAccordion2"
                            navAction="open">
                            <mat-icon>palette</mat-icon> Palette
                        </button>`
                }
            </ngx-sidenav>

            <div class="page-container">
                <!-- # Panels -->
                <div class="panels">
                ${panels ?? '<ngx-nav-panel #panelRight panelType="open-left"></ngx-nav-panel>'}
                </div>
                <!-- # Content -->
                <div class="content">
                    ${getDynamicContent('ContentType.TITLE_TEXT')}
                </div>
            </div>
        </div>

    </section>

    <!-- # Templates -->
    ${getDynamicContentTemplates()}`;

export const sidenavHorizontalTemplate = (params: Parameters<typeof sidenavTemplate> = {} as Parameters<typeof sidenavTemplate>): string => sidenavTemplate({
    ...params,
    buttons: `<button nav-icon-button
                    routerLink="/item1"
                    routerLinkActive="ngx-nav-state-selected"
                    [routerLinkActiveOptions]="{exact: false}"
                    [navPanel]="panelRight"
                    [navPanelContent]="contentAccordion1"
                    navAction="open"
                    matTooltip="filter">
                    <mat-icon>filter_alt</mat-icon>
                </button>
                <button nav-icon-button
                    routerLink="/item2"
                    routerLinkActive="ngx-nav-state-selected"
                    [routerLinkActiveOptions]="{exact: false}"
                    [navPanel]="panelRight"
                    [navPanelContent]="contentAccordion2"
                    navAction="open"
                    matTooltip="settings">
                    <mat-icon>settings</mat-icon>
                </button>`
});
