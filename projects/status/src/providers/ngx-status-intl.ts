import { Injectable } from '@angular/core';
import { NgxAbstractIntl } from '@hug/ngx-core';

/**
 * Data for internationalization
 */
@Injectable()
export class NgxStatusIntl extends NgxAbstractIntl<NgxStatusIntl> {

    public errorDetails = '';
    public copyToClipboard = '';
    public dateError = '';
    public openStatusDetailDialogFailed = '';
    public warn = '';
    public error = '';
}
