import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

import { NgxUserCard } from './user-card.model';

const greenBadgeFamily = ['Médico-technique', 'Social', 'Médico-thérapeutique', 'Pharmacie'];
const blueBadgeFamily = ['Soins', 'Infirmier-e'];
const redBadgeFamily = ['Médecin dentiste', 'Médecin'];
type BadgeColor = 'green' | 'blue' | 'red' | 'grey';

interface DisplayableUserCard {
    initials?: string;
    function?: string;
    fullname?: string;
    badgeColor?: BadgeColor;
    specialty?: string;
    service?: string;
    type?: string;
    phoneNumber?: string;
    mobileNumber?: string;
    email?: string;
    address?: string;
}

@Component({
    selector: 'ngx-user-card',
    styleUrls: ['./user-card.component.scss'],
    templateUrl: './user-card.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        NgClass,
        MatIcon
    ]
})
export class NgxUserCardComponent implements OnChanges {

    @Input()
    public user!: NgxUserCard;

    protected userCard!: DisplayableUserCard;

    private _expanded = true;
    @Input()
    public set expanded(value: BooleanInput) {
        this._expanded = coerceBooleanProperty(value);
    }

    public get expanded(): BooleanInput {
        return this._expanded;
    }

    @Input()
    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['user']) {
            this.userCard = this.buildDisplayableUserCard(this.user);
        }
    }

    private buildDisplayableUserCard(user: NgxUserCard): DisplayableUserCard {
        return {
            fullname: this.getFullName(user),
            initials: user.initials,
            function: this.getFunction(user).toLocaleLowerCase(),
            specialty: this.getSpecialty(user),
            badgeColor: this.getBadgeColor(user.familyCode),
            service: user.esoN3Label,
            type: user.type,
            phoneNumber: this.formatPhone(user.phone),
            mobileNumber: this.formatPhone(user.bip || user.mobile),
            email: user.email?.toLowerCase(),
            address: this.getUserAddress(user)
        };
    }

    private getUserAddress(user: NgxUserCard): string | undefined {
        if (user.organisation || user.address || user.zipCode || user.city) {
            let address = '';
            if (user.organisation) {
                address += `${user.organisation} <br>`;
            }
            if (user.address) {
                address += `${user.address} <br>`;
            }
            if (user.zipCode) {
                address += `${user.zipCode} `;
            }
            if (user.city) {
                address += `${user.city}`;
            }
            return address;
        }
        return undefined;
    }

    private getBadgeColor(familyCode?: string): BadgeColor | undefined {
        if (!familyCode) {
            return undefined;
        }
        if (greenBadgeFamily.includes(familyCode)) {
            return 'green';
        }
        if (blueBadgeFamily.includes(familyCode)) {
            return 'blue';
        }
        if (redBadgeFamily.includes(familyCode)) {
            return 'red';
        }
        return 'grey';
    }

    private getSpecialty(user: NgxUserCard): string | undefined {
        if (this.isValidSpecialty(user.specialty1) || this.isValidSpecialty(user.specialty2)) {
            return [user.specialty1, user.specialty2].filter(s => this.isValidSpecialty(s)).join(', ');
        } else if (user.speciality?.trim()) {
            return user.speciality;
        }
        return undefined;
    }

    private isValidSpecialty(specialty: string | undefined): boolean {
        const s = specialty?.trim();
        return !!s && s !== '-' && s !== 'null';
    }

    private getFunction(user: NgxUserCard): string {
        return user.groupFunctionLabel ? `${user.groupFunctionLabel}` : `${user.functionSefName ? user.functionSefName : ''} ${user.functionSefCode ? `(${user.functionSefCode})` : ''} ${user.role ? `/ ${user.role}` : ''}`;
    }

    private getShortTitle(title?: string): string {
        switch (title?.toLowerCase().trim()) {
            case 'monsieur':
                return 'M.';
            case 'madame':
                return 'Mme.';
            case 'docteur':
                return 'Dr.';
            case 'docteure':
                return 'Dre.';
            case 'professeur':
                return 'Pr.';
            case 'professeure':
                return 'Pre.';
            default:
                return title || '';
        }
    }

    private getFullName(user: NgxUserCard): string {
        return `${this.getShortTitle(user.title)} ${user.firstname || ''} ${user.lastname || ''}`;
    }

    private formatPhone(rawNumber?: string): string | undefined {
        if (rawNumber?.length === 10 && rawNumber.startsWith('0')) {
            return rawNumber.replace(/^(\d{3})(\d{3})(\d{2})(\d{2})$/, '$1 $2 $3 $4'); // 0xx xxx xx xx
        }
        if ((rawNumber?.length === 12 && rawNumber.startsWith('+')) || (rawNumber?.length === 13 && rawNumber.startsWith('00'))) {
            return rawNumber.replace(/^(\+|0{2})(\d{2})(\d{2})(\d{3})(\d{2})(\d{2})$/, '$1$2 $3 $4 $5 $6'); // 00|+xx xx xxx xx xx
        }
        return rawNumber;
    }
}
