import { Injectable, Type } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AbstractLazyModule, NgxDialogService, NgxLazyLoaderService } from '@hug/ngx-core';

import { Status } from '../status.model';

@Injectable({
    providedIn: 'root'
})
export class NgxStatusDetailDialogService extends NgxDialogService<void, Status> {
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
        } as MatDialogConfig<Status>);
    }

    protected getModule(): Promise<Type<AbstractLazyModule<unknown>>> {
        return import('./status-detail.module').then(m => m.NgxStatusDetailModule);
    }
}
