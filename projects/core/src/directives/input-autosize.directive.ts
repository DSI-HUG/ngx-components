import { DestroyRef, Directive, ElementRef, inject, NgZone, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MatInput } from '@angular/material/input';
import { debounceTime, fromEvent, mergeWith, of, startWith } from 'rxjs';

@Directive({
    selector: '[ngx-input-autosize][matInput], [ngx-input-autosize] [matInput]',
    exportAs: 'ngx-input-autosize',
    standalone: true
})
export class NgxInputAutosizeDirective implements OnInit {
    private elementRef = inject<ElementRef<HTMLInputElement>>(ElementRef);
    private ngZone = inject(NgZone);
    private matInput = inject(MatInput);
    private destroyRef = inject(DestroyRef);

    public ngOnInit(): void {
        const inputElement = this.elementRef.nativeElement;
        const valueChanges$ = this.matInput?.ngControl?.valueChanges ?? of(null);

        this.ngZone.runOutsideAngular(() => {
            fromEvent<Event>(inputElement, 'input').pipe(
                mergeWith(fromEvent<Event>(inputElement, 'paste'), valueChanges$),
                startWith(inputElement.value),
                debounceTime(5),
                takeUntilDestroyed(this.destroyRef)
            ).subscribe(() => {
                const nbChar = inputElement.value?.length;

                // Forced to have a fallback value as the "style" is higher than class/usual style in the hierarchy
                inputElement.style.width = nbChar ? `${nbChar}ch` : '1ch';
                inputElement.style.maxWidth = '100%';
            });
        });
    }
}
