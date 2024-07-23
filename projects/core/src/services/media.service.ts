import { Inject, Injectable, InjectionToken, NgZone, OnDestroy, Optional } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable, shareReplay } from 'rxjs';

export interface NgxMediaQueryDefinition {
    alias: string;
    mediaQuery: string;
    overlapping?: boolean;
}

export const mediaQueryDefinitions = new InjectionToken<NgxMediaQueryDefinition[]>('MEDIA_QUERY_DEFINITIONS');

export const defaultMediaQueryDefinitions = [
    {
        alias: 'xs',
        mediaQuery: '(min-width: 0px) and (max-width: 599px)'
    },
    {
        alias: 'gt-xs',
        overlapping: true,
        mediaQuery: '(min-width: 600px)'
    },
    {
        alias: 'lt-sm',
        overlapping: true,
        mediaQuery: '(max-width: 599px)'
    },
    {
        alias: 'sm',
        mediaQuery: '(min-width: 600px) and (max-width: 959px)'
    },
    {
        alias: 'gt-sm',
        overlapping: true,
        mediaQuery: '(min-width: 960px)'
    },
    {
        alias: 'lt-md',
        overlapping: true,
        mediaQuery: '(max-width: 959px)'
    },
    {
        alias: 'md',
        mediaQuery: '(min-width: 960px) and (max-width: 1279px)'
    },
    {
        alias: 'gt-md',
        overlapping: true,
        mediaQuery: '(min-width: 1280px)'
    },
    {
        alias: 'lt-lg',
        overlapping: true,
        mediaQuery: '(max-width: 1279px)'
    },
    {
        alias: 'lg',
        mediaQuery: '(min-width: 1280px) and (max-width: 1919px)'
    },
    {
        alias: 'gt-lg',
        overlapping: true,
        mediaQuery: '(min-width: 1920px)'
    },
    {
        alias: 'lt-xl',
        overlapping: true,
        mediaQuery: '(max-width: 1920px)'
    },
    {
        alias: 'xl',
        mediaQuery: '(min-width: 1920px) and (max-width: 5000px)'
    }
] as NgxMediaQueryDefinition[];

export const simplifiedMediaQueryDefinitions = [
    {
        alias: 'xs',
        mediaQuery: '(max-width: 599px)'
    }, {
        alias: 'sm',
        mediaQuery: '(min-width: 600px) and (max-width: 959px)'
    }, {
        alias: 'md',
        mediaQuery: '(min-width: 860px) and (max-width: 1279px)'
    }, {
        alias: 'lg',
        mediaQuery: '(min-width: 1280px)'
    }
] as NgxMediaQueryDefinition[];

@Injectable({
    providedIn: 'root'
})
export class NgxMediaService implements OnDestroy {
    public readonly isHandset$: Observable<boolean>;
    public readonly isMobile$: Observable<boolean>;
    public mediaChanged$ = new BehaviorSubject('lg');
    public mql = {} as Record<string, MediaQueryList>;

    public constructor(
        private zone: NgZone,
        @Optional() @Inject(mediaQueryDefinitions) mediaDefinitions?: NgxMediaQueryDefinition[]
    ) {
        if (!mediaDefinitions) {
            mediaDefinitions = simplifiedMediaQueryDefinitions;
        }

        mediaDefinitions.forEach(mediaDefinition => {
            const { alias, mediaQuery } = mediaDefinition;
            this.mql[alias] = window.matchMedia(mediaQuery);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            this.mql[alias].addEventListener('change', this.onMqlEvent.bind(this, alias));
            if (this.mql[alias].matches) {
                this.mediaChanged$ = new BehaviorSubject(alias);
            }
        });

        this.isHandset$ = this.mediaChanged$.pipe(
            map(alias => alias === 'xs'),
            distinctUntilChanged(),
            shareReplay({ bufferSize: 1, refCount: false })
        );

        this.isMobile$ = this.mediaChanged$.pipe(
            map(alias => alias === 'xs' || alias === 'sm'),
            distinctUntilChanged(),
            shareReplay({ bufferSize: 1, refCount: false })
        );
    }

    public ngOnDestroy(): void {
        Object.keys(this.mql).forEach(alias => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            this.mql[alias].removeEventListener('change', this.onMqlEvent as never);
            delete this.mql[alias];
        });
    }

    private onMqlEvent(alias: string, event: MediaQueryListEvent): void {
        this.zone.run(() => {
            if (event.matches) {
                this.mediaChanged$.next(alias);
            }
        });
    }
}
