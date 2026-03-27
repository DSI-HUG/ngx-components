import { Directive } from '@angular/core';

@Directive({
    selector: 'h2[ngxBarTitle], h3[ngxBarTitle], h4[ngxBarTitle], h5[ngxBarTitle], h6[ngxBarTitle]',
    standalone: true
})
export class NgxBarTitleDirective {}
