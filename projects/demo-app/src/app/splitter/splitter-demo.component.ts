import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
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
