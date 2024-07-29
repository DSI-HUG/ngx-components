import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { NgxAbstractLazyModule } from '@hug/ngx-core';
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
export class NgxStatusModule extends NgxAbstractLazyModule<NgxStatusComponent> {
    public constructor() {
        super(NgxStatusComponent);
    }
}
