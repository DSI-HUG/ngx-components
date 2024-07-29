import { Injectable, Type } from '@angular/core';
import { MatLegacyDialog as MatDialog, MatLegacyDialogConfig as MatDialogConfig } from '@angular/material/legacy-dialog';
import { NgxAbstractLazyModule, NgxDialogService, NgxLazyLoaderService } from '@hug/ngx-core';

import { NgxStatus } from '../status.model';

@Injectable({
    providedIn: 'root'
})
export class NgxStatusDetailDialogService extends NgxDialogService<void, NgxStatus> {
    public constructor(
        lazyLoaderService: NgxLazyLoaderService,
        dialog: MatDialog
    ) {
        super(lazyLoaderService, dialog, {
            disableClose: false,
            hasBackdrop: true,
            height: '500px',
            width: '700px',
            panelClass: 'ngx-status-panel'
        } as MatDialogConfig<NgxStatus>);
    }

    protected getModule(): Promise<Type<NgxAbstractLazyModule<unknown>>> {
        return import('./status-detail.module').then(m => m.NgxStatusDetailModule);
    }
}
