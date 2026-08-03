import { inject, Injectable } from '@angular/core';

import { NgxUserCardIntl } from '../providers';
import { NgxUserCard } from '../user-card.model';
import { UserCardDataProviderBaseService } from './user-card-data-provider-base.service';
import type { BadgeColor, UserCardDisplayModel } from './user-card-display.model';

@Injectable({
    providedIn: 'root'
})
/**
 * @deprecated This service is deprecated and will be removed in future versions. Please use UserCardDataProviderService instead.
 */
export class UserCardDataAdapterLegacyService extends UserCardDataProviderBaseService {

    protected greenBadgeFamily: string[];
    protected blueBadgeFamily: string[];
    protected redBadgeFamily: string[];

    private readonly intl = inject(NgxUserCardIntl, { optional: true });

    public constructor() {
        super();
        this.greenBadgeFamily = [
            this.intl?.medTech ?? 'Medical-technical',
            this.intl?.social ?? 'Social',
            this.intl?.medTherapeutic ?? 'Medical-therapeutic',
            this.intl?.pharmacy ?? 'Pharmacy'
        ];
        this.blueBadgeFamily = [
            this.intl?.care ?? 'Care',
            this.intl?.nurse ?? 'Nurse'
        ];
        this.redBadgeFamily = [
            this.intl?.dentist ?? 'Dentist',
            this.intl?.doctor ?? 'Doctor'
        ];
    }

    override buildDisplayableUserCard(user: NgxUserCard): UserCardDisplayModel {
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

    override getShortTitle(user: NgxUserCard): string {
        const title = user?.title;
        switch (title?.toLowerCase().trim()) {
            case 'monsieur':
                return this.intl?.mr ?? 'Mr.';
            case 'madame':
                return this.intl?.mrs ?? 'Mrs.';
            case 'docteur':
                return this.intl?.dr ?? 'Dr.';
            case 'docteure':
                return this.intl?.drF ?? 'Dr.';
            case 'professeur':
                return this.intl?.prof ?? 'Prof.';
            case 'professeure':
                return this.intl?.profF ?? 'Prof.';
            default:
                return title || '';
        }
    }

    private getBadgeColor(familyCode?: string): BadgeColor | undefined {
        if (!familyCode) {
            return undefined;
        }
        if (this.greenBadgeFamily.includes(familyCode)) {
            return 'green';
        }
        if (this.blueBadgeFamily.includes(familyCode)) {
            return 'blue';
        }
        if (this.redBadgeFamily.includes(familyCode)) {
            return 'red';
        }
        return 'grey';
    }

}
