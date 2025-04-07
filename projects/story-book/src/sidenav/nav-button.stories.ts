import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, RouterModule } from '@angular/router';
import { NavButtonComponent, NavModule } from '@hug/ngx-sidenav';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { NavButtonComponentArgs } from './args/nav-button.args';
import { sidenavRoutes } from './helpers/sidenav.routes';
import { navButtonComponent } from './stories/nav-button.component';
import { navButtonHorizontal } from './stories/nav-button.horizontal';
import { navButtonOptions } from './stories/nav-button.options';
import { navButtonStandard } from './stories/nav-button.standard';
import { navButtonStates } from './stories/nav-button.states';

const meta: Meta<NavButtonComponent> = {
    title: 'Components/Sidenav/NavButton/NavButton',
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
                MatBadgeModule,
                MatIconModule,
                RouterModule,
                NavModule
            ]
        })
    ],
    tags: [
        'autodocs'
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

export const standard: StoryObj<NavButtonComponentArgs> = navButtonStandard;
export const component: StoryObj<NavButtonComponentArgs> = navButtonComponent;
export const options: StoryObj<NavButtonComponentArgs> = navButtonOptions;
export const states: StoryObj<NavButtonComponentArgs> = navButtonStates;
export const horizontal: StoryObj<NavButtonComponentArgs> = navButtonHorizontal;
