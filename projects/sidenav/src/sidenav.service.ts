import { inject, Injectable } from '@angular/core';
import { NgxMediaService } from '@hug/ngx-core';
import { mergeWith, Observable, ReplaySubject, shareReplay, switchMap, take } from 'rxjs';
import { map } from 'rxjs/operators';

export type SidenavMode = 'over' | 'side';

@Injectable({
    providedIn: 'root'
})
export class NgxSidenavService {
    public readonly openChanged$: Observable<boolean>;
    public readonly modeChanged$: Observable<SidenavMode>;
    public readonly hiddenChanged$: Observable<boolean>;

    protected mediaService = inject(NgxMediaService);

    private readonly opened$ = new ReplaySubject<boolean>(1);
    private readonly mode$ = new ReplaySubject<SidenavMode>(1);
    private readonly hidden$ = new ReplaySubject<boolean>(1);
    private readonly toggle$ = new ReplaySubject<void>(1);

    public constructor() {
        const alias$ = this.mediaService.mediaChanged$.pipe(
            shareReplay({ bufferSize: 1, refCount: false })
        );

        const toggleChanged$ = this.toggle$.pipe(
            switchMap(() => this.openChanged$.pipe(
                take(1),
                map(opened => !opened)
            )),
            shareReplay({ bufferSize: 1, refCount: false })
        );

        this.openChanged$ = alias$.pipe(
            map(alias => alias === 'lg' || alias === 'xl'),
            mergeWith(this.opened$, toggleChanged$),
            shareReplay({ bufferSize: 1, refCount: false })
        );

        this.modeChanged$ = alias$.pipe(
            map(alias => alias === 'xs' ? 'over' : 'side'),
            mergeWith(this.mode$),
            shareReplay({ bufferSize: 1, refCount: false })
        );

        this.hiddenChanged$ = alias$.pipe(
            map(alias => alias === 'xs'),
            mergeWith(this.hidden$),
            shareReplay({ bufferSize: 1, refCount: false })
        );
    }

    public open(): void {
        this.opened$.next(true);
    }

    public close(): void {
        this.opened$.next(false);
    }

    public toggle(): void {
        this.toggle$.next();
    }

    public hide(): void {
        this.hidden$.next(true);
    }

    public show(): void {
        this.hidden$.next(false);
    }

    public mode(value: SidenavMode): void {
        this.mode$.next(value);
    }
}
