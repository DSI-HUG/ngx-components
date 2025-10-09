import { Injectable } from '@angular/core';
import { NgxLayoutIntl } from '@hug/ngx-layout';

@Injectable()
export class CustomNgxLayoutIntl extends NgxLayoutIntl {
    public override closeLabel = '***My custom closeLabel***';
}
