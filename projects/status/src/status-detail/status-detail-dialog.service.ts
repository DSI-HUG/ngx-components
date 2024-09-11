import { Injectable, Type } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { NgxAbstractLazyModule, NgxDialogService } from '@hug/ngx-core';

import { NgxStatus } from '../status.model';

@Injectable({
    providedIn: 'root'
})
export class NgxStatusDetailDialogService extends NgxDialogService<void, NgxStatus> {
    public constructor() {
        super({
            disableClose: false,
            hasBackdrop: true,
            width: '700px',
            panelClass: 'ngx-status-panel'
        } as MatDialogConfig<NgxStatus>);
    }

    protected getModule(): Promise<Type<NgxAbstractLazyModule<unknown>>> {
        return import('./status-detail.module').then(m => m.NgxStatusDetailModule);
    }
}
