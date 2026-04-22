import { Directive } from '@angular/core';

@Directive({
    selector: 'button, [ngxAction]',
    standalone: true
})
export class NgxActionDirective {}
