import { Injectable } from '@angular/core';
import { NgxAbstractIntl } from '@hug/ngx-core';
/**
 * Data for internationalization
 */
@Injectable()
export class NgxLayoutIntl extends NgxAbstractIntl<NgxLayoutIntl> {
    public help = '';
    public back = '';
    public deleteSearch = '';
    public openSearchBar = '';
    public moreActions = '';
}
