import { Injectable } from '@angular/core';
import { NgxStatusIntl } from '@hug/ngx-status';

@Injectable()
export class CustomNgxStatusIntl extends NgxStatusIntl {
    public override errorDetails = '***My custom errorDetails***';
}
