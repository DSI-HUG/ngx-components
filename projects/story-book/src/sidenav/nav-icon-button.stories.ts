import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, RouterModule } from '@angular/router';
import { NavModule, NgxNavIconButtonComponent } from '@hug/ngx-sidenav';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { NavButtonComponentArgs } from './args/nav-button.args';
import { sidenavRoutes } from './helpers/sidenav.routes';
import { navIconButtonComponent } from './stories/nav-icon-button.component';
import { navIconButtonHorizontal } from './stories/nav-icon-button.horizontal';
import { navIconButtonOptions } from './stories/nav-icon-button.options';
import { navIconButtonStandard } from './stories/nav-icon-button.standard';
import { navIconButtonStates } from './stories/nav-icon-button.states';

const meta: Meta<NgxNavIconButtonComponent> = {
    title: 'Components/Sidenav/NavButton/NavIconButton',
    component: NgxNavIconButtonComponent,
    decorators: [
        applicationConfig({
            providers: [
                provideAnimations(),
                provideRouter(sidenavRoutes)
            ]
        }),
        moduleMetadata({
            imports: [
                MatIconModule,
                MatBadgeModule,
                MatTooltipModule,
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

export const standard: StoryObj<NavButtonComponentArgs> = navIconButtonStandard;
export const component: StoryObj<NavButtonComponentArgs> = navIconButtonComponent;
export const options: StoryObj<NavButtonComponentArgs> = navIconButtonOptions;
export const states: StoryObj<NavButtonComponentArgs> = navIconButtonStates;
export const horizontal: StoryObj<NavButtonComponentArgs> = navIconButtonHorizontal;
