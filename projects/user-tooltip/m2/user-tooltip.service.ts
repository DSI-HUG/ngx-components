import { Injectable } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { NgxTooltipService } from '@hug/ngx-tooltip/m2';
import { NgxUserCard } from '@hug/ngx-user-card/m2';
import { from, map, Observable } from 'rxjs';

import { NgxUserTooltipComponent } from './user-tooltip.component';

@Injectable({
    providedIn: 'root'
})
export class NgxUserTooltipService extends NgxTooltipService<NgxUserCard, NgxUserTooltipComponent> {

    public constructor() {
        super({
            width: 'auto',
            minWidth: '16px',
            panelClass: 'no-padding-dialog'
        } as MatDialogConfig<NgxUserCard>);
    }

    protected override loadComponent$(): Observable<typeof NgxUserTooltipComponent> {
        return from(import('./user-tooltip.component')).pipe(
            map(ref => ref.NgxUserTooltipComponent)
        );
    }
}
