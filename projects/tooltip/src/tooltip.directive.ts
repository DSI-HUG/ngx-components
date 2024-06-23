import { Directive, ElementRef, Input } from '@angular/core';
import { Destroy } from '@hug/ngx-core';
import { fromEvent, Observable, of, switchMap, take, takeUntil, timer } from 'rxjs';

@Directive({
    selector: '[app-tooltip]',
    standalone: true
})
export class TooltipDirective extends Destroy {
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('tooltip-delay') public delay = 300;

    @Input('app-tooltip') public openTooltip$?: (element: HTMLElement) => Observable<void>;

    public constructor(elementRef: ElementRef) {
        super();

        const triggerElement = elementRef.nativeElement as HTMLElement;

        // Install global CSS if not already present
        const docEl = triggerElement.ownerDocument;
        if (!docEl.head.querySelector('style[data-ngx-tooltip]')) {
            const styleEl = docEl.createElement('style');
            styleEl.setAttribute('data-ngx-tooltip', '');
            styleEl.textContent =
                '.tooltip-opening { opacity: 0; visibility: hidden; transition: opacity 200ms linear; } ' +
                '.tooltip-opening.tooltip-opened { opacity: 1; visibility: visible; }';
            docEl.head.appendChild(styleEl);
        }

        const leave$ = fromEvent<MouseEvent>(triggerElement, 'mouseleave');
        fromEvent<MouseEvent>(triggerElement, 'mouseenter').pipe(
            switchMap(() => timer(this.delay).pipe(
                take(1),
                switchMap(() => this.openTooltip$ ? this.openTooltip$(triggerElement) : of(undefined as void)),
                takeUntil(leave$)
            )),
            takeUntil(this.destroyed$)
        ).subscribe();
    }
}
