import { NgModule } from '@angular/core';
import { NgxAbstractLazyModule } from '@hug/ngx-core';
import { NgxUserCardComponent } from '@hug/ngx-user-card';

import { NgxUserTooltipComponent } from './user-tooltip.component';

@NgModule({
    declarations: [NgxUserTooltipComponent],
    exports: [NgxUserTooltipComponent],
    imports: [
        NgxUserCardComponent
    ]
})
export class NgxUserTooltipModule extends NgxAbstractLazyModule<NgxUserTooltipComponent> {
    public constructor() {
        super(NgxUserTooltipComponent);
    }
}
