import { Directive, forwardRef, inject, input, TemplateRef } from '@angular/core';

import { FILTER_TOKEN, type NgxComplexFilter } from './filter-chip.model';


@Directive({
    selector: 'ng-template[ngxFilter]',
    standalone: true,
    providers: [{ provide: FILTER_TOKEN, useExisting: forwardRef(() => NgxFilterDirective) }]

})
export class NgxFilterDirective implements NgxComplexFilter {
    public readonly type = 'complex';
    public readonly label = input.required<string>();
    public readonly active = input.required<boolean>();
    public readonly selectedFilterLabel = input('');
    public readonly templateRef = inject<TemplateRef<unknown>>(TemplateRef);
}
