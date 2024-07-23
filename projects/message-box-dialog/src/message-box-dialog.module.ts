import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxAbstractLazyModule } from '@hug/ngx-core';

import { NgxMessageBoxDialogComponent } from './message-box-dialog.component';

@NgModule({
    declarations: [NgxMessageBoxDialogComponent],
    exports: [NgxMessageBoxDialogComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatToolbarModule
    ]
})
export class NgxMessageBoxDialogModule extends NgxAbstractLazyModule<NgxMessageBoxDialogComponent> {
    public constructor() {
        super(NgxMessageBoxDialogComponent);
    }
}
