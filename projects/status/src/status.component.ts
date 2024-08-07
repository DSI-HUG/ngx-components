import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, ViewEncapsulation } from '@angular/core';
import { NgxDestroy } from '@hug/ngx-core';
import { catchError, EMPTY, Subject, switchMap, takeUntil, throttleTime } from 'rxjs';

import { NgxStatus, NgxStatusAction, NgxStatusType } from './status.model';
import { NgxStatusDetailDialogService } from './status-detail/status-detail-dialog.service';

@Component({
    selector: 'ngx-status',
    styleUrls: ['./status.component.scss'],
    templateUrl: './status.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class NgxStatusComponent extends NgxDestroy {

    public get status(): NgxStatus | undefined {
        return this._status;
    }

    @Input()
    public set status(value: NgxStatus | undefined) {
        this._status = value;
        this.statusIcon = this.getStatusIcon(value?.type);
    }

    public close = new EventEmitter<void>();

    protected statusIcon: string | undefined;

    protected readonly displayDetailedStatus$ = new Subject<NgxStatus>();

    private statusDetailDialogService = inject(NgxStatusDetailDialogService);

    private _status?: NgxStatus;

    public constructor() {
        super();

        this.displayDetailedStatus$.pipe(
            throttleTime(1000),
            switchMap(status => this.statusDetailDialogService.openDialog$(status).pipe(
                catchError(err => {
                    console.error('Failed to open status detail dialog', err);
                    return EMPTY;
                })
            )),
            takeUntil(this.destroyed$)
        ).subscribe();
    }

    public executeAction(action: NgxStatusAction | undefined): void {
        if (!action?.callback || typeof action.callback !== 'function') {
            return;
        }
        action.callback();
        if (action.terminal) {
            this.close.next();
        }
    }

    private getStatusIcon(statusType: NgxStatusType | undefined): string {
        switch (statusType) {
            case 'success':
                return 'check';
            case 'warn':
                return 'warning';
            case 'danger':
                return 'error_outline';
            case 'primary':
                return 'notifications';
            default:
                return 'info';
        }
    }
}
