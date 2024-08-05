/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxTooltipDirective } from '@hug/ngx-tooltip';
import { Observable } from 'rxjs';

import { TooltipElementDemoService } from './tooltip-element-demo.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-tooltip-demo',
    styleUrls: ['./tooltip-demo.component.scss'],
    templateUrl: './tooltip-demo.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        MatTabsModule,
        MatToolbarModule,
        NgxTooltipDirective,
        MatCardModule,
        NgIf
    ],
    providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
    ]
})
export class TooltipDemoComponent {
    protected tabIndex = 1;

    private tooltipService = inject(TooltipElementDemoService);

    protected complexeTooltip$(): (element: HTMLElement) => Observable<void> {
        return (element: HTMLElement): Observable<void> => this.tooltipService.open$(element, {
            card: {
                title: 'Titre de ce tooltip',
                description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.'
            }
        });
    }

    protected simpleTooltip$(): (element: HTMLElement) => Observable<void> {
        return (element: HTMLElement): Observable<void> => this.tooltipService.open$(element, {
            text: 'Ceci est un tooltip simple'
        });
    }
}
