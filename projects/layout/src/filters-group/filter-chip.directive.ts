import { Directive, forwardRef, inject, input, TemplateRef } from '@angular/core';

import { FILTER_TOKEN, type HospitalityComplexFilter } from './filter-chip.model';


@Directive({
    selector: 'ng-template[hy-filter]',
    standalone: true,
    providers: [{ provide: FILTER_TOKEN, useExisting: forwardRef(() => FilterDirective) }]

})
export class FilterDirective implements HospitalityComplexFilter {
    public readonly type = 'complex';
    public readonly label = input.required<string>();
    public readonly active = input.required<boolean>();
    public readonly selectedFilterLabel = input('');
    public readonly templateRef = inject<TemplateRef<unknown>>(TemplateRef);
}
