import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, RouterModule } from '@angular/router';
import { NavModule, NavPanelComponent } from '@hug/ngx-sidenav';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { NavPanelComponentType } from './args/nav-panel.args';
import { NgxSidenavComponentType } from './args/sidenav.args';
import { ContentTemplatesComponent } from './helpers/content-templates/content-templates.component';
import { sidenavRoutes } from './helpers/sidenav.routes';
import { navPanelComponentDynamicContent } from './stories/nav-panel.component.dynamic-content';
import { navPanelComponentOpenable } from './stories/nav-panel.component.openable';
import { navPanelComponentPanelGroup } from './stories/nav-panel.component.panel-group';
import { navPanelDemo } from './stories/nav-panel.demo';
import { navPanelDirectiveExpandLink } from './stories/nav-panel.directive.expand-link';
import { navPanelGroupId } from './stories/nav-panel.group-id';
import { navPanelScroll } from './stories/nav-panel.scroll';

const meta: Meta<NavPanelComponent> = {
    title: 'Components/Sidenav/NavPanel',
    component: NavPanelComponent,
    decorators: [
        applicationConfig({
            providers: [
                provideAnimations(),
                provideRouter(sidenavRoutes)
            ]
        }),
        moduleMetadata({
            imports: [
                ContentTemplatesComponent,
                MatIconModule,
                MatListModule,
                MatExpansionModule,
                RouterModule,
                MatButtonModule,
                NavModule.forRoot()
            ]
        })
    ],
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: 'The `NavBlocComponent` allow you to create sidebar menu.'
            }
        }
    },
    args: {}
};
export default meta;

export const demo: StoryObj<NavPanelComponentType> = navPanelDemo;
export const scroll: StoryObj<NavPanelComponentType> = navPanelScroll;
// # Feature

export const featureGroupId: StoryObj<NgxSidenavComponentType> = navPanelGroupId;

// # Directive
export const directiveExpandLink: StoryObj<NavPanelComponentType> = navPanelDirectiveExpandLink;

// # Component
export const componentPanelGroup: StoryObj<NavPanelComponentType> = navPanelComponentPanelGroup;
export const componentOpenable: StoryObj<NavPanelComponentType> = navPanelComponentOpenable;
export const componentDynamicContent: StoryObj<NavPanelComponentType> = navPanelComponentDynamicContent;
