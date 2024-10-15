import { DOCUMENT } from '@angular/common';
import { ApplicationRef, DestroyRef, EmbeddedViewRef, inject, Injectable, Injector, ViewContainerRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { from, mergeWith, switchMap, take, tap, timer } from 'rxjs';

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

    protected document = inject<Document>(DOCUMENT);
    protected injector = inject(Injector);
    private destroyRef = inject(DestroyRef);
    private applicationRef = inject(ApplicationRef);

    /**
     * Display an information message to the screen.
     */
    public info(text: string, title = '', duration?: number, actions?: readonly NgxStatusAction[]): void {
        this.showStatus({ type: 'info', title, text, duration, actions });
    }

    /**
     * Display an information message to the screen.
     */
    public success(text: string, title = '', duration?: number, actions?: readonly NgxStatusAction[]): void {
        this.showStatus({ type: 'success', title, text, duration, actions });
    }

    /**
     * Display a warning message to the screen.
     */
    public warning(text: string, title = 'Attention', technicalText?: string, duration?: number, actions?: readonly NgxStatusAction[]): void {
        this.showStatus({ type: 'warn', title, text, duration, technicalText, actions });
    }

    /**
     * Display an error message to the screen and send it to HugLog.
     */
    public error(text: string, title = 'Erreur', technicalText?: string, duration?: number, actions?: readonly NgxStatusAction[]): void {
        this.showStatus({ type: 'danger', title, text, duration, technicalText, actions });
    }

    public showStatus(status: NgxStatus): void {
        from(import('./status.component')).pipe(
            take(1),
            switchMap(component => {
                // Get the root view container ref of the application by injecting it into the root component
                const rootViewContainerRef = this.applicationRef.components[0].injector.get(ViewContainerRef);
                // Insert the modal component into the root view container
                const componentRef = rootViewContainerRef.createComponent(component.NgxStatusComponent);
                componentRef.instance.status = status;
                const applicationRef = this.injector.get(ApplicationRef);
                applicationRef.attachView(componentRef.hostView);

                const domElement = (componentRef.hostView as EmbeddedViewRef<unknown>).rootNodes[0] as HTMLElement;
                this.document.body.appendChild(domElement);

                applicationRef.tick();

                const duration = status.duration || (status.type === 'danger' && durationLong) || durationShort;
                return timer(duration).pipe(
                    mergeWith(componentRef.instance.close),
                    tap(() => {
                        componentRef.destroy();
                        applicationRef.tick();
                    })
                );
            }),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe();
    }
}
