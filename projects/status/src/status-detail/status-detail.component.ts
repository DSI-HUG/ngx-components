import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { NgxMessageBoxType } from '@hug/ngx-message-box';

import { NgxStatus } from '../status.model';

@Component({
    selector: 'ngx-status-detail',
    styleUrls: ['./status-detail.component.scss'],
    templateUrl: './status-detail.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class NgxStatusDetailComponent {
    protected fullTextError: string;
    protected messageBoxType: NgxMessageBoxType;

    public constructor(
        protected dialogRef: MatDialogRef<NgxStatusDetailComponent, void>,
        @Inject(MAT_DIALOG_DATA) protected status: NgxStatus
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
