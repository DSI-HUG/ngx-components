import { Injectable } from '@angular/core';
import { NgxAbstractIntl } from '@hug/ngx-core';

/**
 * Data for internationalization
 */
@Injectable()
export class NgxSearchContainerIntl extends NgxAbstractIntl<NgxSearchContainerIntl> {

    public clearSearch = '';
    public openSearch = '';
    public exitSearch = '';
    public addAttSearchInput = '';
    public addAttNgmodel = '';
}
