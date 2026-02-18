import { Injectable } from '@angular/core';
import { NgxAbstractIntl } from '@hug/ngx-core';

/**
 * Data for internationalization
 */
@Injectable()
export class NgxDatePickerIntl extends NgxAbstractIntl<NgxDatePickerIntl> {

    public erase = '';
    public today = '';
    public openCalendar = '';
    public ok = '';
}
