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
import { sidenavJustifyHorizontal } from './stories/sidenav.justify.horizontal';
import { sidenavJustifyStandard } from './stories/sidenav.justify.standard';
import { sidenavJustifyVertical } from './stories/sidenav.justify.vertical';

const meta: Meta<SidenavComponent> = {
    title: 'Components/Sidenav/Sidenav/Justify',
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

export const standard: StoryObj<NgxSidenavComponentType> = sidenavJustifyStandard;
export const horizontal: StoryObj<NgxSidenavComponentType> = sidenavJustifyHorizontal;
export const vertical: StoryObj<NgxSidenavComponentType> = sidenavJustifyVertical;
