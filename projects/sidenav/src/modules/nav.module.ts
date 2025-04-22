/* eslint-disable @typescript-eslint/naming-convention */
import { ModuleWithProviders, NgModule, Provider } from '@angular/core';

import {
    DynamicContentComponent,
    NavButtonComponent,
    NavButtonDirective,
    NavButtonService,
    NavDividerComponent,
    NavIconButtonDirective,
    NavPanelComponent,
    NavPanelGroupComponent,
    NgxNavIconButtonComponent,
    OpenableComponent,
    SidenavComponent
} from '../components';
import {
    ExpansionPanelExpandLinkDirective,
    NavActionDirective,
    NavButtonGroupDirective,
    NavButtonStyleDirective,
    NavJustifyDirective,
    NavSizeDirective,
    TextEllipsisDirective
} from '../directives';
import { NavPanelGroupService, RouterLinkService } from '../services';
import { PanelRegistry } from '../services/panel.registry';

const ELEMENTS = [
    // # Components
    SidenavComponent,
    NavPanelComponent,
    NavPanelGroupComponent,
    NavButtonComponent,
    NgxNavIconButtonComponent,
    NavDividerComponent,
    DynamicContentComponent,
    OpenableComponent,
    // # Directives
    NavActionDirective,
    ExpansionPanelExpandLinkDirective,
    NavButtonDirective,
    NavIconButtonDirective,
    NavButtonGroupDirective,
    TextEllipsisDirective,
    NavSizeDirective,
    NavJustifyDirective,
    NavButtonStyleDirective
];

export const provideNavModule = (): Provider[] => [
    NavButtonService,
    NavPanelGroupService,
    PanelRegistry,
    RouterLinkService
];


@NgModule({
    imports: ELEMENTS,
    exports: ELEMENTS
})
export class NavModule {
    public static forRoot(): ModuleWithProviders<NavModule> {
        return {
            ngModule: NavModule,
            providers: provideNavModule()
        };
    }
}
