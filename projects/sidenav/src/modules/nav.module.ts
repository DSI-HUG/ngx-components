/* eslint-disable @typescript-eslint/naming-convention */
import { NgModule } from '@angular/core';

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
    NavButtonGroupDirective,
    NavJustifyDirective,
    NavPanelDirective,
    NavSizeDirective,
    TextEllipsisDirective
} from '../directives';
import { NavPanelGroupService, RouterLinkService } from '../services';

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
    NavPanelDirective,
    ExpansionPanelExpandLinkDirective,
    NavButtonDirective,
    NavIconButtonDirective,
    NavButtonGroupDirective,
    TextEllipsisDirective,
    NavSizeDirective,
    NavJustifyDirective
];

@NgModule({
    imports: ELEMENTS,
    exports: ELEMENTS,
    providers: [
        NavButtonService,
        NavPanelGroupService,
        RouterLinkService
    ]
})
export class NavModule {
}
