import { Directive } from '@angular/core';

@Directive({
    selector: 'h2[ngxTitleBar], h3[ngxTitleBar], h4[ngxTitleBar], h5[ngxTitleBar], h6[ngxTitleBar]',
    standalone: true
})
export class NgxTitleBarDirective {}
