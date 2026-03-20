import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { from, Observable, switchMap, take } from 'rxjs';

import { NgxMessageBoxDialogButtons, NgxMessageBoxDialogData, NgxMessageBoxDialogResponse } from './message-box-dialog.model';
import { NgxMessageBoxDialogIntl } from './providers';

@Injectable({
    providedIn: 'root'
})
export class NgxMessageBoxDialogService {
    protected readonly intl = inject(NgxMessageBoxDialogIntl, { optional: true });
    private readonly dialog = inject(MatDialog);

    public open$(dialogData: NgxMessageBoxDialogData | string, additionalDialogConfig?: MatDialogConfig<NgxMessageBoxDialogData>): Observable<NgxMessageBoxDialogResponse | undefined> {
        return from(import('./message-box-dialog.component')).pipe(
            take(1),
            switchMap(dialogComponent => {
                const dialogConfig: MatDialogConfig<NgxMessageBoxDialogData | string> = {
                    panelClass: 'no-padding-dialog',
                    data: dialogData
                };
                return this.dialog.open<unknown, NgxMessageBoxDialogData | string, NgxMessageBoxDialogResponse>(dialogComponent.NgxMessageBoxDialogComponent, { ...dialogConfig, ...(additionalDialogConfig ?? {}) }).afterClosed();
            })
        );
    }

    public openConfirmation$(message: string, dialogConfig?: MatDialogConfig<NgxMessageBoxDialogData>): Observable<NgxMessageBoxDialogResponse | undefined> {
        const dialogData: NgxMessageBoxDialogData = {
            title: '',
            text: message,
            buttons: NgxMessageBoxDialogButtons.OK + NgxMessageBoxDialogButtons.CANCEL
        };

        return this.open$(dialogData, dialogConfig).pipe(
            take(1)
        );
    }
}
