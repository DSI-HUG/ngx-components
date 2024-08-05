/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxUserCard, NgxUserCardComponent } from '@hug/ngx-user-card';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-user-card-demo',
    styleUrls: ['./user-card-demo.component.scss'],
    templateUrl: './user-card-demo.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        MatTabsModule,
        MatToolbarModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        NgxUserCardComponent,
        FormsModule,
        ReactiveFormsModule,
        NgIf
    ]
})
export class UserCardDemoComponent {
    protected tabIndex = 1;

    protected user1!: NgxUserCard;
    protected user2!: NgxUserCard;
    protected user3!: NgxUserCard;

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
        this.user2 = {
            title: "Monsieur",
            firstname: "Albert",
            lastname: "Lullin",
            initials: "alul",
            type: "Type",
            email: "albert.lullin@hug.ch",
            role: "Medecin",
            groupFunctionLabel: "Group",
            familyCode: "Médecin dentiste",
            functionSefName: "SefNameFunction",
            functionSefCode: "SefCodeFunction",
            organisation: "HUG",
            speciality: "Neurochirurgie",
            esoN3Label: "EsoN3Label",
            login: "LullinLogin",
            phone: "+44 150 509 39",
            bip: "8859595",
            mobile: "+44 150 509 39",
            address: "Lucerne, 0 James tutuche ",
            city: "Lucerne",
            zipCode: "6006"
        };
        this.user3 = {
            title: "Madame",
            firstname: "Ludivine",
            lastname: "Coluche",
            initials: "lcol",
            type: "Type",
            email: "ludivine.colluche@hug.ch",
            role: "Infirmière",
            groupFunctionLabel: "Group",
            familyCode: "Médico-technique",
            functionSefName: "SefNameFunction",
            functionSefCode: "SefCodeFunction",
            organisation: "HUG",
            speciality: "Neurochirurgie",
            specialty1: "Dermatologie",
            specialty2: "Pedicure",
            esoN3Label: "EsoN3Label",
            login: "LddsdsdLogin",
            phone: "+44 150 509 39",
            bip: "8859595",
            mobile: "+44 150 509 39",
            address: "Carouge, 7 Rue St Julien",
            city: "Carouge",
            zipCode: "1227"
        };
    }

}
