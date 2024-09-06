import { NgModule } from '@angular/core';
import { NgxAbstractLazyModule } from '@hug/ngx-core';
import { NgxSnackbarComponent } from '@hug/ngx-snackbar';

import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgxStatusComponent } from './status.component';

@NgModule({
    declarations: [NgxStatusComponent],
    exports: [NgxStatusComponent],
    imports: [
        NgxSnackbarComponent,
        MatIcon,
        MatButton
    ]
})
export class NgxStatusModule extends NgxAbstractLazyModule<NgxStatusComponent> {
    public constructor() {
        super(NgxStatusComponent);
    }
}
