import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, inject, Input, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, Subject, switchMap, throttleTime } from 'rxjs';

import { NgxStatusDetailDialogService } from './status-detail/status-detail-dialog.service';
import { NgxStatus, NgxStatusAction, NgxStatusType } from './status.model';

@Component({
    selector: 'ngx-status',
    styleUrls: ['./status.component.scss'],
    templateUrl: './status.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    // standalone: true,
    // imports: [
    //     MatButton,
    //     MatIcon,
    //     NgxSnackbarComponent
    // ]
})
export class NgxStatusComponent {

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
    private destroyRef = inject(DestroyRef);

    private _status?: NgxStatus;

    public constructor() {

        this.displayDetailedStatus$.pipe(
            throttleTime(1000),
            switchMap(status => this.statusDetailDialogService.openDialog$(status).pipe(
                catchError(err => {
                    console.error('Failed to open status detail dialog', err);
                    return EMPTY;
                })
            )),
            takeUntilDestroyed(this.destroyRef)
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
