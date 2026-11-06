import { Directive, input } from '@angular/core';

@Directive({ selector: '[ngxExpandedFilter]' })
export class NgxExpandedDirective {
    public readonly ngxExpandedFilter = input(false);
}
