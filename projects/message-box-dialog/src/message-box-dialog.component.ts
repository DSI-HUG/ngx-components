import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NgxMessageBoxDialogButtons, NgxMessageBoxDialogData } from './message-box-dialog.model';

@Component({
    selector: 'ngx-message-box-dialog',
    templateUrl: './message-box-dialog.component.html',
    styleUrls: ['./message-box-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatToolbarModule
    ]
})
export class NgxMessageBoxDialogComponent {

    protected dialogParams = inject<NgxMessageBoxDialogData>(MAT_DIALOG_DATA);

    protected hasControl(key: 'OK' | 'CANCEL' | 'IGNORE' | 'RETRY' | 'YES' | 'NO' | 'CONTINUE'): boolean {
        // eslint-disable-next-line no-bitwise
        return !!this.dialogParams.buttons && (this.dialogParams.buttons & NgxMessageBoxDialogButtons[key]) !== 0;
    }
}
