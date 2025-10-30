import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgxUserCard, NgxUserCardComponent } from '@hug/ngx-user-card';

@Component({
    selector: 'app-user-card-demo',
    templateUrl: './user-card-demo.component.html',
    styleUrls: ['./user-card-demo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        CommonModule,
        NgxUserCardComponent
    ]
})
export class UserCardDemoComponent {

    public user: NgxUserCard;

    public constructor() {
        this.user = {
            title: "Dr",
            firstname: "Alice",
            lastname: "Dupont",
            initials: "AD",
            type: "Practitioner",
            email: "alice.dupont@example.com",
            role: "Cardiologist",
            groupFunctionLabel: "Medical Staff",
            familyCode: "Medizintechnik",
            functionSefName: "Senior Cardiologist",
            functionSefCode: "CARDIO-SENIOR",
            organisation: "Hôpital Saint-Michel",
            speciality: "Cardiology",
            specialty1: "Heart Failure",
            specialty2: "Interventional Cardiology",
            esoN3Label: "ESO Level 3",
            login: "adupont",
            phone: "0145239876",
            bip: "1234",
            mobile: "+33612345678",
            address: "12 Rue de la Santé",
            city: "Paris",
            zipCode: "75013"
        };
    }

}
