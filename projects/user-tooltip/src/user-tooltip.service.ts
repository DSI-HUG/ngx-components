import { Injectable, Type } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { NgxAbstractLazyModule } from '@hug/ngx-core';
import { NgxTooltipComponentInterface, NgxTooltipService } from '@hug/ngx-tooltip';
import { NgxUserCard } from '@hug/ngx-user-card';

@Injectable({
    providedIn: 'root'
})
export class NgxUserTooltipService extends NgxTooltipService<NgxUserCard> {
    public constructor() {
        super({
            width: 'auto',
            minWidth: '16px',
            panelClass: 'no-padding-dialog'
        } as MatDialogConfig<NgxUserCard>);
    }

    protected override async getModule(): Promise<Type<NgxAbstractLazyModule<NgxTooltipComponentInterface>>> {
        return (await import('./user-tooltip.module')).NgxUserTooltipModule;
    }
}
