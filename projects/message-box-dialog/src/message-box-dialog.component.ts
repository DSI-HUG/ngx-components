import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { NgxMessageBoxDialogButtons, NgxMessageBoxDialogData } from './message-box-dialog.model';

@Component({
    selector: 'ngx-message-box-dialog',
    templateUrl: './message-box-dialog.component.html',
    styleUrls: ['./message-box-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class NgxMessageBoxDialogComponent {

    protected dialogParams = inject<NgxMessageBoxDialogData>(MAT_DIALOG_DATA);

    protected hasControl(key: 'OK' | 'CANCEL' | 'IGNORE' | 'RETRY' | 'YES' | 'NO' | 'CONTINUE'): boolean {
        // eslint-disable-next-line no-bitwise
        return !!this.dialogParams.buttons && (this.dialogParams.buttons & NgxMessageBoxDialogButtons[key]) !== 0;
    }
}
