import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, RouterModule } from '@angular/router';
import { NavModule, SidenavComponent } from '@hug/ngx-sidenav';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { NgxSidenavComponentType } from './args/sidenav.args';
import { sidenavRoutes } from './helpers/sidenav.routes';
import { sidenavAlign } from './stories/sidenav.align';
import { sidenavGroups } from './stories/sidenav.groups';
import { sidenavHorizontal } from './stories/sidenav.horizontal';
import { sidenavScroll } from './stories/sidenav.scroll';
import { sidenavStandard } from './stories/sidenav.standard';
import { sidenavToggle } from './stories/sidenav.toggle';

const meta: Meta<SidenavComponent> = {
    title: 'Components/Sidenav/Sidenav',
    component: SidenavComponent,
    decorators: [
        applicationConfig({
            providers: [
                provideAnimations(),
                provideRouter(sidenavRoutes)
            ]
        }),
        moduleMetadata({
            imports: [
                MatExpansionModule,
                MatIconModule,
                MatListModule,
                MatTooltipModule,
                NavModule,
                RouterModule
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
                component: 'The `SidenavComponent` allow you to create sidebar menu.'
            }
        }
    },
    args: {}
};
export default meta;

export const standard: StoryObj<NgxSidenavComponentType> = sidenavStandard;
export const horizontal: StoryObj<NgxSidenavComponentType> = sidenavHorizontal;
export const toggle: StoryObj<NgxSidenavComponentType> = sidenavToggle;
export const groups: StoryObj<NgxSidenavComponentType> = sidenavGroups;
export const scroll: StoryObj<NgxSidenavComponentType> = sidenavScroll;
export const alignment: StoryObj<NgxSidenavComponentType> = sidenavAlign;
