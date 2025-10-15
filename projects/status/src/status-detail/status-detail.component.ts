import { ChangeDetectionStrategy, Component, Inject, inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxMessageBoxType } from '@hug/ngx-message-box';
import { NgxStatusIntl } from 'projects/status/src/providers';

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
    protected readonly intl = inject(NgxStatusIntl);

    public constructor(
        protected dialogRef: MatDialogRef<NgxStatusDetailComponent, void>,
        @Inject(MAT_DIALOG_DATA) protected status: NgxStatus
    ) {
        this.fullTextError = `${this.intl.dateError}${(status.date ?? new Date()).toUTCString()}\n${status.technicalText || ''}`;

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
        window.prompt(this.intl.copyToClipboard, text);
    }
}
