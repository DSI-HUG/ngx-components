import { NgxUserCard } from '../user-card.model';
import { UserCardDisplayModel } from './user-card-display.model';

export abstract class UserCardDataProviderBaseService {

    protected getUserAddress(user: NgxUserCard): string | undefined {
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

    protected getSpecialty(user: NgxUserCard): string | undefined {
        if (this.isValidSpecialty(user.specialty1) || this.isValidSpecialty(user.specialty2)) {
            return [user.specialty1, user.specialty2].filter(s => this.isValidSpecialty(s)).join(', ');
        } else if (user.speciality?.trim()) {
            return user.speciality;
        }
        return undefined;
    }

    protected isValidSpecialty(specialty: string | undefined): boolean {
        const s = specialty?.trim();
        return !!s && s !== '-' && s !== 'null';
    }

    protected getFunction(user: NgxUserCard): string {
        return user.groupFunctionLabel ? `${user.groupFunctionLabel}` : `${user.functionSefName ? user.functionSefName : ''} ${user.functionSefCode ? `(${user.functionSefCode})` : ''} ${user.role ? `/ ${user.role}` : ''}`;
    }

    protected getFullName(user: NgxUserCard): string {
        return `${this.getShortTitle(user)} ${user.firstname || ''} ${user.lastname || ''}`;
    }

    protected formatPhone(rawNumber?: string): string | undefined {
        if (rawNumber?.length === 10 && rawNumber.startsWith('0')) {
            return rawNumber.replace(/^(\d{3})(\d{3})(\d{2})(\d{2})$/, '$1 $2 $3 $4'); // 0xx xxx xx xx
        }
        if ((rawNumber?.length === 12 && rawNumber.startsWith('+')) || (rawNumber?.length === 13 && rawNumber.startsWith('00'))) {
            return rawNumber.replace(/^(\+|0{2})(\d{2})(\d{2})(\d{3})(\d{2})(\d{2})$/, '$1$2 $3 $4 $5 $6'); // 00|+xx xx xxx xx xx
        }
        return rawNumber;
    }

    abstract buildDisplayableUserCard(user: NgxUserCard): UserCardDisplayModel;

    abstract getShortTitle(user: NgxUserCard): string;

}
