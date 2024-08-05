import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxAbstractLazyModule } from '@hug/ngx-core';

import { TooltipElementDemoComponent } from './tooltip-element-demo.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
    declarations: [TooltipElementDemoComponent],
    exports: [TooltipElementDemoComponent],
    imports: [
        CommonModule,
        MatCardModule
    ]
})
export class TooltipElementDemoModule extends NgxAbstractLazyModule<TooltipElementDemoComponent> {
    public constructor() {
        super(TooltipElementDemoComponent);
    }
}
