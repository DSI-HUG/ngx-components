import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { NgxAbstractLazyModule } from '@hug/ngx-core';
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
export class NgxStatusDetailModule extends NgxAbstractLazyModule<NgxStatusDetailComponent> {
    public constructor() {
        super(NgxStatusDetailComponent);
    }
}
