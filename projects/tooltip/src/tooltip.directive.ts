import { DestroyRef, Directive, ElementRef, inject, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, Observable, of, switchMap, take, takeUntil, timer } from 'rxjs';

@Directive({
    selector: '[ngx-tooltip]',
    standalone: true
})
export class NgxTooltipDirective {
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('ngx-tooltip-delay') public delay = 300;

    @Input('ngx-tooltip') public openTooltip$?: (element: HTMLElement) => Observable<void>;

    private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
    private destroyRef = inject(DestroyRef);

    public constructor() {

        const triggerElement = this.elementRef.nativeElement;

        // Install global CSS if not already present
        const docEl = triggerElement.ownerDocument;
        if (!docEl.head.querySelector('style[data-tooltip]')) {
            const styleEl = docEl.createElement('style');
            styleEl.setAttribute('data-tooltip', '');
            styleEl.textContent = `.ngx-tooltip-opening {
                opacity: 0;
                visibility: hidden;
                transition: opacity 200ms linear;
            }
            .ngx-tooltip-opening.ngx-tooltip-opened {
                opacity: 1;
                visibility: visible;
            }`;
            docEl.head.appendChild(styleEl);
        }

        const leave$ = fromEvent<MouseEvent>(triggerElement, 'mouseleave');

        fromEvent<MouseEvent>(triggerElement, 'mouseenter').pipe(
            switchMap(() => timer(this.delay).pipe(
                take(1),
                switchMap(() => this.openTooltip$ ? this.openTooltip$(triggerElement) : of(undefined as void)),
                takeUntil(leave$)
            )),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe();
    }
}
