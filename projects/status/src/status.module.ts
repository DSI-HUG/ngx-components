import { NgModule } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgxAbstractLazyModule } from '@hug/ngx-core';
import { NgxSnackbarComponent } from '@hug/ngx-snackbar';

import { NgxStatusComponent } from './status.component';

@NgModule({
    declarations: [NgxStatusComponent],
    exports: [NgxStatusComponent],
    imports: [
        MatButton,
        MatIcon,
        NgxSnackbarComponent
    ]
})
export class NgxStatusModule extends NgxAbstractLazyModule<NgxStatusComponent> {
    public constructor() {
        super(NgxStatusComponent);
    }
}
