import {
    CdkConnectedOverlay,
    CdkOverlayOrigin
} from '@angular/cdk/overlay';
import {
    type AfterViewInit,
    Directive,
    ElementRef,
    inject,
    input,
    type OnDestroy
} from '@angular/core';

@Directive({
    selector: '[ngxFiltersOverlayAutoPosition]',
    standalone: true
})
export class NgxFiltersOverlayAutoPositionDirective
implements AfterViewInit, OnDestroy {
    public readonly enabled = input(true, {
        alias: 'ngxFiltersOverlayAutoPosition'
    });

    private readonly overlay = inject(CdkConnectedOverlay);
    private resizeObserver?: ResizeObserver;

    public ngAfterViewInit(): void {
        if (!this.enabled()) {
            return;
        }

        const origin = this.overlay.origin;
        let nativeElement: unknown = null;

        if (origin instanceof HTMLElement) {
            nativeElement = origin;
        } else if (origin instanceof CdkOverlayOrigin) {
            nativeElement = origin.elementRef.nativeElement;
        } else if (origin instanceof ElementRef) {
            nativeElement = origin.nativeElement;
        }

        if (!(nativeElement instanceof Element)) {
            return;
        }

        this.resizeObserver = new ResizeObserver(() => {
            this.overlay.overlayRef?.updatePosition();
        });

        this.resizeObserver.observe(nativeElement);
    }

    public ngOnDestroy(): void {
        this.resizeObserver?.disconnect();
    }
}
