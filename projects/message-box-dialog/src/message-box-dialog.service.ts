import { Injectable, Type } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AbstractLazyModule, NgxDialogService, NgxLazyLoaderService } from '@hug/ngx-core';
import { Observable, take } from 'rxjs';

import { MessageBoxDialogButtons, MessageBoxDialogData, MessageBoxDialogResponse } from './message-box-dialog.model';

@Injectable({
    providedIn: 'root'
})
export class MessageBoxDialogService extends NgxDialogService<MessageBoxDialogResponse, MessageBoxDialogData | string> {
    public constructor(
        lazyLoaderService: NgxLazyLoaderService,
        dialog: MatDialog
    ) {
        super(lazyLoaderService, dialog, {
            panelClass: 'no-padding-dialog'
        } as MatDialogConfig<MessageBoxDialogData>);
    }

    public override openDialog$(dialogData: string | MessageBoxDialogData, dialogConfig?: MatDialogConfig<MessageBoxDialogData>): Observable<MessageBoxDialogResponse | undefined> {
        let messageBoxDialogData: MessageBoxDialogData;
        if (typeof dialogData === 'string') {
            messageBoxDialogData = {
                text: dialogData,
                buttons: MessageBoxDialogButtons.OK
            } as MessageBoxDialogData;
        } else {
            messageBoxDialogData = dialogData;
        }
        messageBoxDialogData.title = messageBoxDialogData.title || 'Confirmation'; // Translate

        return super.openDialog$(messageBoxDialogData, dialogConfig);
    }

    public openConfirmation$(message: string, dialogConfig?: MatDialogConfig<MessageBoxDialogData>): Observable<MessageBoxDialogResponse | undefined> {
        const dialogData = {
            text: message,
            buttons: MessageBoxDialogButtons.OK + MessageBoxDialogButtons.CANCEL
        } as MessageBoxDialogData;

        return this.openDialog$(dialogData, dialogConfig).pipe(
            take(1)
        );
    }

    protected getModule(): Promise<Type<AbstractLazyModule<unknown>>> {
        return import('./message-box-dialog.module').then(m => m.MessageBoxDialogModule);
    }
}
