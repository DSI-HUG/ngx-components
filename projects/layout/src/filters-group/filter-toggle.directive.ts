import { Directive, forwardRef, input, model } from '@angular/core';

import { FILTER_TOKEN, type NgxToggleFilter } from './filter-chip.model';


@Directive({
    selector: 'ng-template[ngx-filter-toggle]',
    standalone: true,
    providers: [{ provide: FILTER_TOKEN, useExisting: forwardRef(() => NgxFilterToggleDirective) }]
})
export class NgxFilterToggleDirective implements NgxToggleFilter {
    public readonly type = 'toggle';
    public readonly label = input.required<string>();
    public readonly active = model.required<boolean>();
}
