import { Injectable, Type } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AbstractLazyModule, NgxLazyLoaderService } from '@hug/ngx-core';
import { TooltipComponentInterface, TooltipService } from '@hug/ngx-tooltip';
import { NgxUserCard } from '@hug/ngx-user-card';

@Injectable({
    providedIn: 'root'
})
export class NgxUserTooltipService extends TooltipService<NgxUserCard> {
    public constructor(
        lazyLoaderService: NgxLazyLoaderService,
        dialog: MatDialog
    ) {
        super(lazyLoaderService, dialog, {
            panelClass: 'no-padding-dialog',
            width: 'auto',
            minWidth: '16px'
        } as MatDialogConfig<NgxUserCard>);
    }

    protected getModule(): Promise<Type<AbstractLazyModule<TooltipComponentInterface>>> {
        return import('./user-tooltip.module').then(m => m.NgxUserTooltipModule);
    }
}
