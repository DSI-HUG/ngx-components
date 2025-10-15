import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { NgxMessageBoxComponent, NgxMessageBoxType } from '@hug/ngx-message-box';
import { NgxStatusIntl } from 'projects/status/src/providers';

import { NgxStatus } from '../status.model';

@Component({
    selector: 'ngx-status-detail',
    styleUrls: ['./status-detail.component.scss'],
    templateUrl: './status-detail.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        DatePipe,
        MatIcon,
        MatIconButton,
        NgxMessageBoxComponent
    ]
})
export class NgxStatusDetailComponent {

    protected fullTextError: string;
    protected messageBoxType: NgxMessageBoxType;
    protected readonly intl = inject(NgxStatusIntl);

    protected status = inject<NgxStatus>(MAT_DIALOG_DATA);

    protected dialogRef = inject<MatDialogRef<NgxStatusDetailComponent, void>>(MatDialogRef);

    public constructor() {
        this.fullTextError = `${this.intl.dateError}${(this.status.date ?? new Date()).toUTCString()}\n${this.status.technicalText || ''}`;

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
        window.prompt(this.intl.copyToClipboard, text);
    }
}
