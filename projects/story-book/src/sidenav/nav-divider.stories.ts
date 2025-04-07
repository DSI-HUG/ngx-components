import { MatIconModule } from '@angular/material/icon';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, RouterModule } from '@angular/router';
import { NavDividerComponent, NavModule } from '@hug/ngx-sidenav';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { sidenavRoutes } from './helpers/sidenav.routes';
import { navDividerHorizontal } from './stories/nav-divider.horizontal';
import { navDividerStandard } from './stories/nav-divider.standard';
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
                component: 'The `NavDividerComponent` allow you to create sidebar menu.'
            }
        }
    },
    args: {}
};
export default meta;

export const standard: StoryObj<NavDividerComponent> = navDividerStandard;
export const vertical: StoryObj<NavDividerComponent> = navDividerVertical;
export const horizontal: StoryObj<NavDividerComponent> = navDividerHorizontal;
