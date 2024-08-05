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
import { NgxUserCard } from '@hug/ngx-user-card';
import { NgxUserTooltipService } from '@hug/ngx-user-tooltip';
import { Observable } from 'rxjs';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-user-tooltip-demo',
    styleUrls: ['./user-tooltip-demo.component.scss'],
    templateUrl: './user-tooltip-demo.component.html',
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
export class UserTooltipDemoComponent {
    protected tabIndex = 1;

    protected user1!: NgxUserCard;

    private userTooltipService = inject(NgxUserTooltipService);

    public constructor() {
        this.user1 = {
            title: "Docteur",
            firstname: "Jean",
            lastname: "PATATE",
            initials: "jpat",
            type: "Type",
            email: "jean.patate@hug.ch",
            role: "Medecin",
            groupFunctionLabel: "Group",
            familyCode: "Infirmier-e",
            functionSefName: "SefNameFunction",
            functionSefCode: "SefCodeFunction",
            organisation: "HUG",
            speciality: "Neurochirurgie",
            specialty1: "Dermatologie",
            specialty2: "Pedicure",
            esoN3Label: "EsoN3Label",
            login: "PatateLogin",
            phone: "+44 150 509 39",
            bip: "8859595",
            mobile: "+44 150 509 39",
            address: "Carouge, 7 Rue St Julien",
            city: "Carouge",
            zipCode: "1227"
        };
    }
    
    protected userTooltip$(): (element: HTMLElement) => Observable<void> {
        return (element: HTMLElement): Observable<void> => this.userTooltipService.open$(element, this.user1);
    }
}
