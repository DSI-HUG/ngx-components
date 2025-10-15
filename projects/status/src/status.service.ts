import { DOCUMENT } from '@angular/common';
import { ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, inject, Injectable, Injector } from '@angular/core';
import { NgxDestroy, NgxLazyLoaderService } from '@hug/ngx-core';
import { mergeWith, switchMap, take, takeUntil, tap, timer } from 'rxjs';

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
export class NgxStatusService extends NgxDestroy {

    protected document = inject<Document>(DOCUMENT);
    protected lazyLoaderService = inject(NgxLazyLoaderService);
    protected injector = inject(Injector);
    protected resolver = inject(ComponentFactoryResolver);
    protected readonly intl = inject(NgxStatusIntl);

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
    public warning(text: string, title = this.intl.warn, technicalText?: string, duration?: number, actions?: readonly NgxStatusAction[]): void {
        this.showStatus({ type: 'warn', title, text, duration, technicalText, actions });
    }

    /**
     * Display an error message to the screen and send it to HugLog.
     */
    public error(text: string, title = this.intl.error, technicalText?: string, duration?: number, actions?: readonly NgxStatusAction[]): void {
        this.showStatus({ type: 'danger', title, text, duration, technicalText, actions });
    }

    public showStatus(status: NgxStatus): void {
        this.lazyLoaderService.loadModule$(
            import('./status.module').then(m => m.NgxStatusModule)
        ).pipe(
            take(1),
            switchMap(moduleInfos => {
                const factory = this.resolver.resolveComponentFactory(moduleInfos.module.componentType);
                const componentRef = factory.create(this.injector);
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
            takeUntil(this.destroyed$)
        ).subscribe();
    }
}
