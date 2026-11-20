import { Directive, input, output } from '@angular/core';
import type { MatMenuPanel } from '@angular/material/menu';


@Directive({
    selector: 'ngx-action',
    standalone: true
})
export class NgxActionDirective {
    // Basic action fields
    public readonly icon = input.required<string>();
    public readonly label = input.required<string>();
    public readonly disabled = input<boolean>(false);
    public readonly menu = input<MatMenuPanel>();

    public readonly execute = output();
}
