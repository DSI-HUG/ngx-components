/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxStatus, NgxStatusModule } from '@hug/ngx-status';

export interface NgxTooltipModel {
    card?: {
        title?: string;
        description?: string;
    }
    text?: string;
}
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-status-demo',
    styleUrls: ['./status-demo.component.scss'],
    templateUrl: './status-demo.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        MatTabsModule,
        MatToolbarModule,
        MatCardModule,
        NgxStatusModule,
        NgIf
    ]
})
export class StatusDemoComponent {
    protected status1!: NgxStatus;
    protected status2!: NgxStatus;
    protected status3!: NgxStatus;
    protected status4!: NgxStatus;

    protected tabIndex = 1;
    
    public constructor() {
        this.status1 = {
            title: "Mon titre de status",
            type: 'info',
            text: 'Attention, voici mon texte',
            technicalText: 'Ici mon texte technique',
            date: new Date(),
            duration: 5000,
            className: 'maClassCss',
            actions: [
                { 
                    label: 'Action 1',
                    callback: (): void  => {
                        console.log('Resultat Action 1');
                        return;
                    }
                }
            ]
        };
        this.status2 = {
            title: "Mon titre de status",
            type: 'warn',
            text: 'Attention, voici mon texte',
            technicalText: 'Ici mon texte technique',
            date: new Date(),
            duration: 5000,
            className: 'maClassCss',
            actions: [
                { 
                    label: 'Action 2',
                    callback: (): void  => {
                        console.log('Resultat Action 2');
                        return;
                    }
                }
            ]
        };
        this.status3 = {
            title: "Mon titre de status",
            type: 'danger',
            technicalText: 'Ici mon texte technique',
            date: new Date(),
            duration: 5000,
            className: 'customCssClass'
        };
        this.status4 = {
            title: "Status rose",
            type: 'danger',
            date: new Date(),
            duration: 5000,
            className: 'maClassCssCouleurRose',
            actions: [
                { 
                    label: 'Action 3',
                    callback: (): void => {
                        console.log('Resultat Action 3');
                        return;
                    }
                }
            ]
        };
    }
}
