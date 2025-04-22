import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, RouterModule } from '@angular/router';
import { NavButtonComponent, NavModule } from '@hug/ngx-sidenav';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { NavButtonComponentArgs } from './args/nav-button.args';
import { NgxSidenavComponentType } from './args/sidenav.args';
import { ContentTemplatesComponent } from './helpers/content-templates/content-templates.component';
import { DynamicRefsComponent } from './helpers/dynamic-refs/dynamic-refs.component';
import { sidenavRoutes } from './helpers/sidenav.routes';
import { navButtonComponent } from './stories/nav-button.component';
import { navButtonDemo } from './stories/nav-button.demo';
import { navButtonDirective } from './stories/nav-button.directive';
import { navButtonDirectiveAction } from './stories/nav-button.directive.action';
import { navButtonDirectiveButtonGroup } from './stories/nav-button.directive.button-group';
import { navButtonDirectiveButtonStyle } from './stories/nav-button.directive.button-style';
import { navButtonOptions } from './stories/nav-button.options';
import { navButtonStates } from './stories/nav-button.states';
import { sidenavExampleToggle } from './stories/sidenav.example.toggle';

const meta: Meta<NavButtonComponent> = {
    title: 'Components/Sidenav/NavButton',
    component: NavButtonComponent,
    decorators: [
        applicationConfig({
            providers: [
                provideAnimations(),
                provideRouter(sidenavRoutes)
            ]
        }),
        moduleMetadata({
            imports: [
                DynamicRefsComponent,
                ContentTemplatesComponent,
                MatBadgeModule,
                MatIconModule,
                MatTooltipModule,
                RouterModule,
                NavModule.forRoot()
            ]
        })
    ],
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: 'The `NgxNavIconButtonComponent` allow you to create sidebar menu.'
            }
        }
    },
    args: {}
};
export default meta;

// # Views
export const demo: StoryObj<NavButtonComponentArgs> = navButtonDemo;
export const directive: StoryObj<NavButtonComponentArgs> = navButtonDirective;
export const component: StoryObj<NavButtonComponentArgs> = navButtonComponent;

// # Features
export const featureList: StoryObj<NavButtonComponentArgs> = navButtonOptions;
export const featureStates: StoryObj<NavButtonComponentArgs> = navButtonStates;

// # Directive
export const directiveAction: StoryObj<NavButtonComponentArgs> = navButtonDirectiveAction;
export const directiveButtonStyle: StoryObj<NavButtonComponentArgs> = navButtonDirectiveButtonStyle;
export const directiveButtonGroup: StoryObj<NavButtonComponentArgs> = navButtonDirectiveButtonGroup;

// # Example
export const exampleToggle: StoryObj<NgxSidenavComponentType> = sidenavExampleToggle;
