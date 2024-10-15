import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { from, Observable, switchMap, take } from 'rxjs';

import { NgxStatus } from '../status.model';

@Injectable({
    providedIn: 'root'
})
export class NgxStatusDetailDialogService {
    private dialog = inject(MatDialog);

    public open$(dialogData: NgxStatus): Observable<void | undefined> {
        return from(import('./status-detail.component')).pipe(
            take(1),
            switchMap(dialogComponent => {
                const dialogConfig = {
                    disableClose: false,
                    hasBackdrop: true,
                    width: '700px',
                    panelClass: 'ngx-status-panel',
                    data: dialogData
                } as MatDialogConfig<NgxStatus>;

                return this.dialog.open<unknown, NgxStatus, void>(dialogComponent.NgxStatusDetailComponent, dialogConfig).afterClosed();
            })
        );
    }
}
