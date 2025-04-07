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
import { sidenavSizeHorizontal } from './stories/sidenav.size.horizontal';
import { sidenavSizeStandard } from './stories/sidenav.size.standard';
import { sidenavSizeVertical } from './stories/sidenav.size.vertical';

const meta: Meta<SidenavComponent> = {
    title: 'Components/Sidenav/Sidenav/Size',
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

export const standard: StoryObj<NgxSidenavComponentType> = sidenavSizeStandard;
export const horizontal: StoryObj<NgxSidenavComponentType> = sidenavSizeHorizontal;
export const vertical: StoryObj<NgxSidenavComponentType> = sidenavSizeVertical;
