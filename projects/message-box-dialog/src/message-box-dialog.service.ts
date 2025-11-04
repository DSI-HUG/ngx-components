import { inject, Injectable, Type } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NgxAbstractLazyModule, NgxDialogService, NgxLazyLoaderService } from '@hug/ngx-core';
import { Observable, take } from 'rxjs';

import { NgxMessageBoxDialogButtons, NgxMessageBoxDialogData, NgxMessageBoxDialogResponse } from './message-box-dialog.model';
import { NgxMessageBoxDialogIntl } from './providers';

@Injectable({
    providedIn: 'root'
})
export class NgxMessageBoxDialogService extends NgxDialogService<NgxMessageBoxDialogResponse, NgxMessageBoxDialogData | string> {
    protected readonly intl = inject(NgxMessageBoxDialogIntl);

    public constructor(
        lazyLoaderService: NgxLazyLoaderService,
        dialog: MatDialog
    ) {
        super(lazyLoaderService, dialog, {
            panelClass: 'no-padding-dialog'
        } as MatDialogConfig<NgxMessageBoxDialogData>);
    }

    public override openDialog$(dialogData: string | NgxMessageBoxDialogData, dialogConfig?: MatDialogConfig<NgxMessageBoxDialogData>): Observable<NgxMessageBoxDialogResponse | undefined> {
        let messageBoxDialogData: NgxMessageBoxDialogData;
        if (typeof dialogData === 'string') {
            messageBoxDialogData = {
                text: dialogData,
                buttons: NgxMessageBoxDialogButtons.OK
            } as NgxMessageBoxDialogData;
        } else {
            messageBoxDialogData = dialogData;
        }
        messageBoxDialogData.title = messageBoxDialogData.title || this.intl.confirmation; // Translate

        return super.openDialog$(messageBoxDialogData, dialogConfig);
    }

    public openConfirmation$(message: string, dialogConfig?: MatDialogConfig<NgxMessageBoxDialogData>): Observable<NgxMessageBoxDialogResponse | undefined> {
        const dialogData = {
            text: message,
            buttons: NgxMessageBoxDialogButtons.OK + NgxMessageBoxDialogButtons.CANCEL
        } as NgxMessageBoxDialogData;

        return this.openDialog$(dialogData, dialogConfig).pipe(
            take(1)
        );
    }

    protected getModule(): Promise<Type<NgxAbstractLazyModule<unknown>>> {
        return import('./message-box-dialog.module').then(m => m.NgxMessageBoxDialogModule);
    }
}
