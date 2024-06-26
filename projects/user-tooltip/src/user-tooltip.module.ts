import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AbstractLazyModule } from '@hug/ngx-core';
import { UserCardComponent } from '@hug/ngx-user-card';

import { UserTooltipComponent } from './user-tooltip.component';

@NgModule({
    declarations: [UserTooltipComponent],
    exports: [UserTooltipComponent],
    imports: [
        CommonModule,
        UserCardComponent
    ]
})
export class UserTooltipModule extends AbstractLazyModule<UserTooltipComponent> {
    public constructor() {
        super(UserTooltipComponent);
    }
}
