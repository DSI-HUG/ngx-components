import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AbstractLazyModule } from '@hug/ngx-core';
import { NgxMessageBoxComponent } from '@hug/ngx-message-box';

import { NgxStatusDetailComponent } from './status-detail.component';

@NgModule({
    declarations: [NgxStatusDetailComponent],
    exports: [NgxStatusDetailComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        NgxMessageBoxComponent
    ]
})
export class NgxStatusDetailModule extends AbstractLazyModule<NgxStatusDetailComponent> {
    public constructor() {
        super(NgxStatusDetailComponent);
    }
}
