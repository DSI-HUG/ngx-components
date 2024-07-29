import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDestroy } from '@hug/ngx-core';
import { NgxMessageBoxAction, NgxMessageBoxComponent } from '@hug/ngx-message-box';
import { NgxMessageBoxDialogButtons, NgxMessageBoxDialogService } from '@hug/ngx-message-box-dialog';
import { Subject, switchMap, takeUntil } from 'rxjs';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-message-box-demo',
    styleUrls: ['./message-box-demo.component.scss'],
    templateUrl: './message-box-demo.component.html',
    standalone: true,
    imports: [
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatTabsModule,
        MatToolbarModule,
        NgxMessageBoxComponent,
        NgIf
    ]
})
export class MessageBoxDemoComponent extends NgxDestroy {
    protected tabIndex = 1;

    protected closeAction = [
        {
            action: (): void => alert('test action'),
            icon: 'clear'
        }
    ] as readonly NgxMessageBoxAction[];

    protected openDialog$ = new Subject<void>();

    private messageBoxService = inject(NgxMessageBoxDialogService);

    public constructor() {
        super();

        this.openDialog$.pipe(
            switchMap(() => {
                const dialogData = {
                    title: 'MessageBox Dialog',
                    text: 'This is a message box dialog. Click OK or Cancel to close.',
                    buttons: NgxMessageBoxDialogButtons.OK + NgxMessageBoxDialogButtons.CANCEL
                };

                return this.messageBoxService.openDialog$(dialogData);
            }),
            takeUntil(this.destroyed$)
        ).subscribe(response => {
            alert(`${response} was clicked`);
        });
    }
}
