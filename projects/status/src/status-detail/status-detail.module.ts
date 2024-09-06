import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgxAbstractLazyModule } from '@hug/ngx-core';
import { NgxMessageBoxComponent } from '@hug/ngx-message-box';

import { NgxStatusDetailComponent } from './status-detail.component';

@NgModule({
    declarations: [NgxStatusDetailComponent],
    exports: [NgxStatusDetailComponent],
    imports: [
        DatePipe,
        MatIcon,
        MatIconButton,
        NgxMessageBoxComponent
    ]
})
export class NgxStatusDetailModule extends NgxAbstractLazyModule<NgxStatusDetailComponent> {
    public constructor() {
        super(NgxStatusDetailComponent);
    }
}
