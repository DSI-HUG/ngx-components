import { MatIconModule } from '@angular/material/icon';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, RouterModule } from '@angular/router';
import { NavDividerComponent, NavModule } from '@hug/ngx-sidenav';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { NavDividerComponentArgs } from './args/nav-divider.args';
import { sidenavRoutes } from './helpers/sidenav.routes';
import { navDividerDemo } from './stories/nav-divider.demo';
import { navDividerHorizontal } from './stories/nav-divider.horizontal';
import { navDividerVertical } from './stories/nav-divider.vertical';

const meta: Meta<NavDividerComponent> = {
    title: 'Components/Sidenav/NavDivider',
    component: NavDividerComponent,
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
                RouterModule,
                NavModule.forRoot()
            ]
        })
    ],
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: 'The `NavDividerComponent` allow you to create sidebar menu.'
            }
        }
    },
    args: {}
};
export default meta;

export const demo: StoryObj<NavDividerComponentArgs> = navDividerDemo;
export const featureVertical: StoryObj<NavDividerComponentArgs> = navDividerVertical;
export const featureHorizontal: StoryObj<NavDividerComponentArgs> = navDividerHorizontal;
