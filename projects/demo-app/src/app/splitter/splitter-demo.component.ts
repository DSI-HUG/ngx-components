/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SplitAreaDirective, SplitterComponent } from '@hug/ngx-splitter';

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
        SplitterComponent,
        SplitAreaDirective
    ]
})
export class SplitterDemoComponent {
}
