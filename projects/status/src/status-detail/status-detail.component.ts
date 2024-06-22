import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageBoxType } from '@hug/ngx-message-box';

import { Status } from '../status.model';

@Component({
    selector: 'app-status-detail',
    styleUrls: ['./status-detail.component.scss'],
    templateUrl: './status-detail.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class StatusDetailComponent {
    protected fullTextError: string;
    protected messageBoxType: MessageBoxType;

    public constructor(
        protected dialogRef: MatDialogRef<StatusDetailComponent, void>,
        @Inject(MAT_DIALOG_DATA) protected status: Status
    ) {
        this.fullTextError = `Error Date: ${(status.date ?? new Date()).toUTCString()}\n${status.technicalText || ''}`;

        switch (status.type) {
            case 'primary':
                this.messageBoxType = 'primary';
                break;
            case 'success':
                this.messageBoxType = 'success';
                break;
            case 'warn':
                this.messageBoxType = 'warn';
                break;
            case 'danger':
                this.messageBoxType = 'danger';
                break;
            default:
                this.messageBoxType = 'info';
                break;
        }
    }

    public copyToClipboard(text: string): void {
        window.prompt('Copy to clipboard: Ctrl+C, Enter', text);
    }
}
