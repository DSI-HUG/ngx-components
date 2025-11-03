import { Injectable } from '@angular/core';
import { NgxAbstractIntl } from '@hug/ngx-core';

/**
 * Data for internationalization
 */
@Injectable()
export class NgxUserCardIntl extends NgxAbstractIntl<NgxUserCardIntl> {

    public service = '';
    public type = '';
    public phoneNumber = '';
    public mobileNumber = '';
    public email = '';
    public address = '';
    public medTech = '';
    public social = '';
    public medTherapeutic = '';
    public pharmacy = '';
    public care = '';
    public nurse = '';
    public dentist = '';
    public doctor = '';
    public mr = '';
    public mrs = '';
    public dr = '';
    public drF = '';
    public prof = '';
    public profF = '';
}
