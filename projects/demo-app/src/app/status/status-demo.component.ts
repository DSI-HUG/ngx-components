import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxStatus, NgxStatusDetailComponent, NgxStatusDetailModule, NgxStatusModule, NgxStatusType } from '@hug/ngx-status';
import { BehaviorSubject, distinctUntilChanged, map, Observable, shareReplay } from 'rxjs';

@Component({
    selector: 'app-status-demo',
    styleUrls: [
        './status-demo.component.scss'
    ],
    templateUrl: './status-demo.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatCardModule,
        MatTabsModule,
        MatToolbarModule,
        NgxStatusModule,
        NgxStatusDetailModule,
        MatButtonToggleModule,
        NgIf,
        AsyncPipe
    ]
})
export class StatusDemoComponent {

    protected readonly status$: Observable<NgxStatus>;
    protected readonly typeChanged$ = new BehaviorSubject<NgxStatusType>('primary');

    public constructor(private dialog: MatDialog) {
        this.status$ = this.typeChanged$.pipe(
            distinctUntilChanged(),
            map<NgxStatusType, NgxStatus>(type => ({
                type,
                title: 'Sample Status Title',
                text: `Sample text for the status message of type ${type}.`,
                date: new Date(),
                technicalText: 'Error technical text',
                originalError: new Error('Original error'),
                actions: [{
                    label: 'Print',
                    callback: (): void => console.log('Print clicked!')
                }, {
                    label: 'Like',
                    callback: (): void => console.log('Like clicked!')
                }]
            })),
            shareReplay({ bufferSize: 1, refCount: false })
        );
    }

    public openStatusDetail(): void {
        const status: NgxStatus = {
            title: 'Sample Status Title',
            type: 'info',
            text: 'Sample text for the status message'
        };

        this.dialog.open(NgxStatusDetailComponent, {
            width: '600px',
            data: status
        });
    }
}
