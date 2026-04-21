import { Directive } from '@angular/core';

@Directive({
    selector: 'button, [ngx-action]',
    standalone: true
})
export class NgxActionDirective {}
