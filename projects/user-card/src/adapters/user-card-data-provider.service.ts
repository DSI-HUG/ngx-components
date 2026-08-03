import { Injectable } from '@angular/core';

import { NgxUserCard } from '../user-card.model';
import { UserCardDataProviderBaseService } from './user-card-data-provider-base.service';
import type { BadgeColor, UserCardDisplayModel } from './user-card-display.model';

@Injectable({
    providedIn: 'root'
})
export class UserCardDataProviderService extends UserCardDataProviderBaseService {

    override buildDisplayableUserCard(user: NgxUserCard): UserCardDisplayModel {
        return {
            fullname: this.getFullName(user),
            initials: user.initials,
            function: this.getFunction(user).toLocaleLowerCase(),
            specialty: this.getSpecialty(user),
            badgeColor: (user?.userCardBadgeColor || 'grey') as BadgeColor,
            service: user.esoN3Label,
            type: user.type,
            phoneNumber: this.formatPhone(user.phone),
            mobileNumber: this.formatPhone(user.bip || user.mobile),
            email: user.email?.toLowerCase(),
            address: this.getUserAddress(user)
        };
    }

    override getShortTitle(user: NgxUserCard): string {
        return user?.shortTitle || '';
    }

}
