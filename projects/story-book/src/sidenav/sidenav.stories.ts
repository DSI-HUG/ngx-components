import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, RouterModule } from '@angular/router';
import { NavModule, SidenavComponent } from '@hug/ngx-sidenav';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { NavButtonComponentArgs } from './args/nav-button.args';
import { NgxSidenavComponentType } from './args/sidenav.args';
import { ContentTemplatesComponent } from './helpers/content-templates/content-templates.component';
import { sidenavRoutes } from './helpers/sidenav.routes';
import { sidenavExampleTwoColumnNested } from './stories/sidenav.example.two-column.nested';
import { sidenavExampleTwoColumnStandard } from './stories/sidenav.example.two-column.standard';
import { sidenavHorizontal } from './stories/sidenav.horizontal';
import { sidenavHorizontalButtons } from './stories/sidenav.horizontal.buttons';
import { sidenavJustify } from './stories/sidenav.justify';
import { sidenavJustifyByDefault } from './stories/sidenav.justify.by-default';
import { sidenavScroll } from './stories/sidenav.scroll';
import { sidenavSize } from './stories/sidenav.size';
import { sidenavSizeHorizontal } from './stories/sidenav.size.horizontal';
import { sidenavSizeVertical } from './stories/sidenav.size.vertical';
import { sidenavVertical } from './stories/sidenav.vertical';

const meta: Meta<SidenavComponent> = {
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
                ContentTemplatesComponent,
                MatExpansionModule,
                MatIconModule,
                MatListModule,
                MatTooltipModule,
                NavModule.forRoot(),
                RouterModule
            ]
        })
    ],
    title: 'Components/Sidenav/Sidenav',
    parameters: {
        docs: {
            description: {
                component: 'The `SidenavComponent` allow you to create sidebar menu.'
            }
        }
    }
};
export default meta;

// # Features
export const featureVertical: StoryObj<NgxSidenavComponentType> = sidenavVertical;
export const featureHorizontal: StoryObj<NgxSidenavComponentType> = sidenavHorizontal;
export const featureHorizontalButtons: StoryObj<NavButtonComponentArgs> = sidenavHorizontalButtons;
export const featureScroll: StoryObj<NgxSidenavComponentType> = sidenavScroll;

// # Directive
// ## Justify
export const directiveJustify: StoryObj<NgxSidenavComponentType> = sidenavJustify;
export const directiveJustifyByDefault: StoryObj<NgxSidenavComponentType> = sidenavJustifyByDefault;

// ## Size
export const directiveSize: StoryObj<NgxSidenavComponentType> = sidenavSize;
export const directiveSizeHorizontal: StoryObj<NgxSidenavComponentType> = sidenavSizeHorizontal;
export const directiveSizeVertical: StoryObj<NgxSidenavComponentType> = sidenavSizeVertical;

// # Example
export const exampleTwoColumn: StoryObj<NgxSidenavComponentType> = sidenavExampleTwoColumnStandard;
export const exampleNested: StoryObj<NgxSidenavComponentType> = sidenavExampleTwoColumnNested;

