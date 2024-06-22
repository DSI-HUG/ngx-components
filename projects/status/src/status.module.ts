import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AbstractLazyModule } from '@hug/ngx-core';
import { SnackbarComponent } from '@hug/ngx-snackbar';

import { StatusComponent } from './status.component';

@NgModule({
    declarations: [StatusComponent],
    exports: [StatusComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        SnackbarComponent
    ]
})
export class StatusModule extends AbstractLazyModule<StatusComponent> {
    public constructor() {
        super(StatusComponent);
    }
}
