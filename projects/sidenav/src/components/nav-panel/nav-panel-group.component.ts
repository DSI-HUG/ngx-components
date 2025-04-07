/* eslint-disable @typescript-eslint/member-ordering, @angular-eslint/prefer-on-push-component-change-detection */
import { Component, input } from '@angular/core';

import { PanelTheme } from '../../enums';
import { provideOpenableTokens } from '../../tokens/openable.tokens';
import { navPanelAnimations } from './nav-panel.animations';
import { NavPanelComponent } from './nav-panel.component';

@Component({
    selector: 'ngx-nav-panel-group',
    templateUrl: './nav-panel.component.html',
    providers: [
        provideOpenableTokens(NavPanelGroupComponent)
    ],
    animations: navPanelAnimations
})
export class NavPanelGroupComponent extends NavPanelComponent {
    protected override readonly id: string = 'ngx-nav-panel ngx-nav-panel-group';
    public override readonly panelTheme = input<PanelTheme>(PanelTheme.NONE);
}
