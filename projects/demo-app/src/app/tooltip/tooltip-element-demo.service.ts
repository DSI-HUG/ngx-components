import { Injectable, Type } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NgxAbstractLazyModule, NgxLazyLoaderService } from '@hug/ngx-core';
import { NgxTooltipComponentInterface, NgxTooltipService } from '@hug/ngx-tooltip';
import { NgxTooltipModel } from './tooltip-element-demo.component';

@Injectable({
    providedIn: 'root'
})
export class TooltipElementDemoService extends NgxTooltipService<NgxTooltipModel> {
    public constructor(
        lazyLoaderService: NgxLazyLoaderService,
        dialog: MatDialog
    ) {
        super(lazyLoaderService, dialog, {
            width: 'auto',
            minWidth: '16px',
            panelClass: 'no-padding-dialog'
        } as MatDialogConfig<NgxTooltipModel>);
    }

    protected override getModule(): Promise<Type<NgxAbstractLazyModule<NgxTooltipComponentInterface>>> {
        return import('./tooltip-element-demo.module').then(m => m.TooltipElementDemoModule);
    }
}
