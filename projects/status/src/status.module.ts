import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AbstractLazyModule } from '@hug/ngx-core';
import { NgxSnackbarComponent } from '@hug/ngx-snackbar';

import { NgxStatusComponent } from './status.component';

@NgModule({
    declarations: [NgxStatusComponent],
    exports: [NgxStatusComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        NgxSnackbarComponent
    ]
})
export class NgxStatusModule extends AbstractLazyModule<NgxStatusComponent> {
    public constructor() {
        super(NgxStatusComponent);
    }
}
