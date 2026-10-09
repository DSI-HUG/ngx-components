import { Directive, forwardRef, inject, input, TemplateRef } from '@angular/core';

import { FILTER_TOKEN, type NgxComplexFilter } from './filter-chip.model';
import type { NgxFilterContext } from './filters-group.component';

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
    public readonly icon = input<string>();
    public readonly templateRef = inject<TemplateRef<unknown>>(TemplateRef);
    public readonly dynamicValidation = input<boolean>(true);

    static ngTemplateContextGuard(
        _directive: NgxFilterDirective,
        _context: unknown
    ): _context is NgxFilterContext {
        return true;
    }
}
