import { Directive, forwardRef, input, model } from '@angular/core';

import { FILTER_TOKEN, type HospitalityToggleFilter } from './filter-chip.model';


@Directive({
    selector: 'ng-template[hy-filter-toggle]',
    standalone: true,
    providers: [{ provide: FILTER_TOKEN, useExisting: forwardRef(() => FilterToggleDirective) }]
})
export class FilterToggleDirective implements HospitalityToggleFilter {
    public readonly type = 'toggle';
    public readonly label = input.required<string>();
    public readonly active = model.required<boolean>();
}
