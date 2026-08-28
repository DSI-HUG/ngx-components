import { Directive, input, output } from '@angular/core';


@Directive({
    selector: 'ngx-action',
    standalone: true
})
export class NgxActionDirective {
    // Basic action fields
    public readonly icon = input.required<string>();
    public readonly label = input.required<string>();
    public readonly disabled = input<boolean>(false);

    public readonly execute = output<void>();
}
