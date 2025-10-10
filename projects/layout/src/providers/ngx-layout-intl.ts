import { Injectable } from '@angular/core';
import { NgxAbstractIntl } from '@hug/ngx-core';

/**
 * Data for internationalization
 */
@Injectable()
export class NgxLayoutIntl extends NgxAbstractIntl<NgxLayoutIntl> {

    public closeLabel = '';
    public backLabel = '';
    public sideFilterLabel = '';
}
