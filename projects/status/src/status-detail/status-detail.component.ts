import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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

    protected status = inject<NgxStatus>(MAT_DIALOG_DATA);

    protected dialogRef = inject<MatDialogRef<NgxStatusDetailComponent, void>>(MatDialogRef);

    public constructor() {
        this.fullTextError = `Error Date: ${(this.status.date ?? new Date()).toUTCString()}\n${this.status.technicalText || ''}`;

        switch (this.status.type) {
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
