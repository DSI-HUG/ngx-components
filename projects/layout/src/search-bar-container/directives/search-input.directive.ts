import { Directive, ElementRef, inject, type Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { type FormControl, NgControl } from '@angular/forms';

@Directive({
    selector: 'input[ngxSearchInput]',
    /* eslint-disable @typescript-eslint/naming-convention */
    host: {
        '(blur)': 'blurred.set(true);',
        '(focus)': 'blurred.set(false);'
    }
})
export class NgxSearchInputDirective {
    public readonly blurred = signal<boolean>(false);
    public readonly value: Signal<string>;

    private readonly ngControl = inject(NgControl);
    private readonly input = inject<ElementRef<HTMLInputElement>>(ElementRef);
    private readonly control = this.ngControl.control as FormControl<string>;

    public constructor() {
        this.value = toSignal(this.control.valueChanges, { initialValue: '' });
    }

    public focus(): void {
        this.input.nativeElement.focus();
    }

    public reset(): void {
        this.control.reset();
    }
}
