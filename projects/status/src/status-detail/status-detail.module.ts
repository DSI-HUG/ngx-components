import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AbstractLazyModule } from '@hug/ngx-core';
import { MessageBoxComponent } from '@hug/ngx-message-box';

import { StatusDetailComponent } from './status-detail.component';

@NgModule({
    declarations: [StatusDetailComponent],
    exports: [StatusDetailComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MessageBoxComponent
    ]
})
export class StatusDetailModule extends AbstractLazyModule<StatusDetailComponent> {
    public constructor() {
        super(StatusDetailComponent);
    }
}
