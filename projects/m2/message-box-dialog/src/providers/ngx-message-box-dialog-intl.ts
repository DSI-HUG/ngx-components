import { Injectable } from '@angular/core';
import { NgxAbstractIntl } from '@hug/ngx-core';

/**
 * Data for internationalization
 */
@Injectable()
export class NgxMessageBoxDialogIntl extends NgxAbstractIntl<NgxMessageBoxDialogIntl> {

    public cancel = '';
    public ignore = '';
    public retry = '';
    public ok = '';
    public yes = '';
    public no = '';
    public continue = '';
    public confirmation = '';
}
