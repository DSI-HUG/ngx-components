import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MessageBoxDialogButtons, MessageBoxDialogData } from './message-box-dialog.model';

@Component({
    selector: 'app-message-box-dialog',
    templateUrl: './message-box-dialog.component.html',
    styleUrls: ['./message-box-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class MessageBoxDialogComponent {
    public constructor(
        @Inject(MAT_DIALOG_DATA) protected dialogParams: MessageBoxDialogData
    ) { }

    protected hasControl(key: 'OK' | 'CANCEL' | 'IGNORE' | 'RETRY' | 'YES' | 'NO' | 'CONTINUE'): boolean {
        // eslint-disable-next-line no-bitwise
        return !!this.dialogParams.buttons && (this.dialogParams.buttons & MessageBoxDialogButtons[key]) !== 0;
    }
}
