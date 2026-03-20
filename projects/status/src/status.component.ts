import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, model, output, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgxSnackbarComponent } from '@hug/ngx-snackbar';
import { catchError, EMPTY, Subject, switchMap, throttleTime } from 'rxjs';

import { NgxStatusIntl } from './providers';
import { NgxStatus, NgxStatusAction } from './status.model';
import { NgxStatusDetailDialogService } from './status-detail/status-detail-dialog.service';

@Component({
    selector: 'ngx-status',
    styleUrl: './status.component.scss',
    templateUrl: './status.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        MatButton,
        MatIcon,
        NgxSnackbarComponent
    ]
})
export class NgxStatusComponent {

    public readonly status = model<NgxStatus>();

    public readonly close = output<void>();

    protected readonly statusIcon = computed<string | undefined>(() => {
        switch (this.status()?.type) {
            case 'success':
                return 'check';
            case 'warn':
                return 'warning';
            case 'danger':
                return 'release_alert';
            default:
                return 'notifications';
        }
    });

    protected readonly displayDetailedStatus$ = new Subject<NgxStatus>();

    private readonly intl = inject(NgxStatusIntl, { optional: true });
    private readonly statusDetailDialogService = inject(NgxStatusDetailDialogService);
    private readonly destroyRef = inject(DestroyRef);

    public constructor() {
        this.displayDetailedStatus$.pipe(
            throttleTime(1000),
            switchMap(status => this.statusDetailDialogService.open$(status).pipe(
                catchError(err => {
                    console.error(this.intl?.openStatusDetailDialogFailed ?? 'Failed to open status detail dialog', err);
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
            this.close.emit();
        }
    }

}
