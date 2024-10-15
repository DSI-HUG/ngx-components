import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { from, Observable, switchMap, take } from 'rxjs';

import { NgxMessageBoxDialogButtons, NgxMessageBoxDialogData, NgxMessageBoxDialogResponse } from './message-box-dialog.model';

@Injectable({
    providedIn: 'root'
})
export class NgxMessageBoxDialogService {
    private dialog = inject(MatDialog);

    public open$(dialogData: NgxMessageBoxDialogData | string, additionalDialogConfig?: MatDialogConfig<NgxMessageBoxDialogData>): Observable<NgxMessageBoxDialogResponse | undefined> {
        return from(import('./message-box-dialog.component')).pipe(
            take(1),
            switchMap(dialogComponent => {
                let messageBoxDialogData: NgxMessageBoxDialogData;
                if (typeof dialogData === 'string') {
                    messageBoxDialogData = {
                        text: dialogData,
                        buttons: NgxMessageBoxDialogButtons.OK
                    } as NgxMessageBoxDialogData;
                } else {
                    messageBoxDialogData = dialogData;
                }
                messageBoxDialogData.title = messageBoxDialogData.title || 'Confirmation'; // Translate

                const dialogConfig = {
                    panelClass: 'no-padding-dialog',
                    data: dialogData
                } as MatDialogConfig<NgxMessageBoxDialogData | string>;

                return this.dialog.open<unknown, NgxMessageBoxDialogData | string, NgxMessageBoxDialogResponse>(dialogComponent.NgxMessageBoxDialogComponent, { ...dialogConfig, ...(additionalDialogConfig ?? {}) }).afterClosed();
            })
        );
    }

    public openConfirmation$(message: string, dialogConfig?: MatDialogConfig<NgxMessageBoxDialogData>): Observable<NgxMessageBoxDialogResponse | undefined> {
        const dialogData = {
            text: message,
            buttons: NgxMessageBoxDialogButtons.OK + NgxMessageBoxDialogButtons.CANCEL
        } as NgxMessageBoxDialogData;

        return this.open$(dialogData, dialogConfig).pipe(
            take(1)
        );
    }
}
