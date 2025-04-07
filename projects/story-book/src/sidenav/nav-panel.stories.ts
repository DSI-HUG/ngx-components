import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, RouterModule } from '@angular/router';
import { NavModule, NavPanelComponent } from '@hug/ngx-sidenav';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { NgxNavPanelComponentType } from './args/nav-panel.args';
import { sidenavRoutes } from './helpers/sidenav.routes';
import { navPanelScroll } from './stories/nav-panel.scroll';
import { navPanelStandard } from './stories/nav-panel.standard';
import { navPanelTwoPanel } from './stories/nav-panel.two-panel';

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
                MatIconModule,
                MatListModule,
                MatExpansionModule,
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
                component: 'The `NavBlocComponent` allow you to create sidebar menu.'
            }
        }
    },
    args: {}
};
export default meta;

export const standard: StoryObj<NgxNavPanelComponentType> = navPanelStandard;
export const twoPanel: StoryObj<NgxNavPanelComponentType> = navPanelTwoPanel;
export const scroll: StoryObj<NgxNavPanelComponentType> = navPanelScroll;
