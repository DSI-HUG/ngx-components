import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxStatus, NgxStatusModule, NgxStatusType } from '@hug/ngx-status';
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
        MatButtonToggleModule,
        NgIf,
        AsyncPipe
    ]
})
export class StatusDemoComponent {

    protected readonly status$: Observable<NgxStatus>;
    protected readonly typeChanged$ = new BehaviorSubject<NgxStatusType>('primary');

    public constructor() {
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
}
