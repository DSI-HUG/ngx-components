export type BadgeColor = 'green' | 'blue' | 'red' | 'grey';

export interface UserCardDisplayModel {
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
