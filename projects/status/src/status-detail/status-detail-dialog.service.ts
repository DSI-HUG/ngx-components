import { Injectable, Type } from '@angular/core';
import { NgxAbstractLazyModule, NgxDialogService, NgxLazyLoaderService } from '@hug/ngx-core';

import { NgxStatus } from '../status.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

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
