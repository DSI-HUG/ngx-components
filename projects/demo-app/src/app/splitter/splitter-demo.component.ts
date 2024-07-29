import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxSplitAreaDirective, NgxSplitterComponent } from '@hug/ngx-splitter';

@Component({
    selector: 'app-splitter-demo',
    styleUrls: [
        './splitter-demo.component.scss'
    ],
    templateUrl: './splitter-demo.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatCardModule,
        MatTabsModule,
        MatToolbarModule,
        NgxSplitterComponent,
        NgxSplitAreaDirective
    ]
})
export class SplitterDemoComponent {
}
