import { DOCUMENT } from '@angular/common';
import { ApplicationRef, DestroyRef, EmbeddedViewRef, EventEmitter, inject, Injectable, Injector, ViewContainerRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { from, mergeWith, switchMap, take, tap, timer } from 'rxjs';

import { NgxStatusIntl } from './providers';
import { NgxStatus, NgxStatusAction } from './status.model';

const durationLong = 30_000;
const durationShort = 8_000;

/**
 * Service handling the messages displayed
 * This service send <code>Status</code> objects to <code>statusObserver</code>
 * @todo: what to do with fieldNames ?
 *
 * @dynamic
 */
@Injectable({
    providedIn: 'root'
})
export class NgxStatusService {

    private readonly document = inject<Document>(DOCUMENT);
    private readonly injector = inject(Injector);
    private readonly intl = inject(NgxStatusIntl, { optional: true });
    private readonly destroyRef = inject(DestroyRef);

    /**
     * Display an information message to the screen.
     */
    public info(text: string, title: string | { title: string; subtitle: string } = '', duration?: number, actions?: readonly NgxStatusAction[]): void {
        const { title: mainTitle, subtitle = '' } = typeof title === 'string' ? { title } : title;

        this.showStatus({ type: 'info', title: mainTitle, subtitle, text, duration, actions });
    }

    /**
     * Display an information message to the screen.
     */
    public success(text: string, title: string | { title: string; subtitle: string } = '', duration?: number, actions?: readonly NgxStatusAction[]): void {
        const { title: mainTitle, subtitle = '' } = typeof title === 'string' ? { title } : title;

        this.showStatus({ type: 'success', title: mainTitle, subtitle, text, duration, actions });
    }

    /**
     * Display a warning message to the screen.
     */
    public warning(text: string, title: string | { title: string; subtitle: string } = this.intl?.warn ?? 'Caution', technicalText?: string, duration?: number, actions?: readonly NgxStatusAction[]): void {
        const { title: mainTitle, subtitle = '' } = typeof title === 'string' ? { title } : title;

        this.showStatus({ type: 'warn', title: mainTitle, subtitle, text, duration, technicalText, actions });
    }

    /**
     * Display an error message to the screen and send it to HugLog.
     */
    public error(text: string, title: string | { title: string; subtitle: string } = this.intl?.error ?? 'Error', technicalText?: string, duration?: number, actions?: readonly NgxStatusAction[]): void {
        const { title: mainTitle, subtitle = '' } = typeof title === 'string' ? { title } : title;

        this.showStatus({ type: 'danger', title: mainTitle, subtitle, text, duration, technicalText, actions });
    }

    public showStatus(status: NgxStatus): void {
        from(import('./status.component')).pipe(
            take(1),
            switchMap(component => {
                // Get the root view container ref of the application by injecting it into the root component
                const applicationRef = this.injector.get(ApplicationRef);
                const rootViewContainerRef = applicationRef.components[0]?.injector.get(ViewContainerRef);
                // Insert the modal component into the root view container
                const componentRef = rootViewContainerRef?.createComponent(component.NgxStatusComponent);

                if (componentRef) {
                    componentRef.instance.status = status;
                    const domElement = (componentRef?.hostView as EmbeddedViewRef<unknown>).rootNodes[0] as HTMLElement;
                    this.document.body.appendChild(domElement);
                }

                applicationRef.tick();

                const duration = status.duration || (status.type === 'danger' && durationLong) || durationShort;
                return timer(duration).pipe(
                    mergeWith(componentRef?.instance.close ?? new EventEmitter<void>),
                    tap(() => {
                        componentRef?.destroy();
                        applicationRef.tick();
                    })
                );
            }),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe();
    }
}
