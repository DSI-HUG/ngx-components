import { catchError, Observable, throwError } from 'rxjs';

export interface NgxCacheEntry<T> {
    timeStamp: number;
    data$: T;
}

export class NgxCache<T, K = string> extends Map<K, NgxCacheEntry<T>> {
    public constructor(public duty = 86400000) {
        super();
    }

    public override clear(timeStamp?: number): void {
        this.forEach((value, key) => {
            if (!timeStamp || (value.timeStamp && value.timeStamp <= timeStamp)) {
                this.delete(key);
            }
        });
    }

    public getCache(key: K, defaultValueFn?: (timeStamp: number) => T): T | undefined {
        const now = Date.now();

        // clear obsolete caches
        this.clear(now);

        const entry = super.get(key);
        let data$ = entry?.data$;
        if (!data$ && defaultValueFn) {
            data$ = defaultValueFn(now);
            super.set(key, {
                timeStamp: this.duty ? now + this.duty : 0,
                data$
            });
        }
        return data$;
    }

    public setCache(key: K, value: T): void {
        super.set(key, {
            timeStamp: this.duty ? Date.now() + this.duty : 0,
            data$: value
        });
    }
}

export class NgxObservableCache<T, K = string> extends NgxCache<Observable<T>, K> {
    // eslint-disable-next-line rxjs/finnish
    public override getCache(key: K, defaultValueFn?: (timeStamp: number) => Observable<T>): Observable<T> {
        const data$ = super.getCache(key, defaultValueFn);
        if (!data$) {
            return throwError(() => new Error(`Fail too get cache for key ${String(key)}, defaultValueFn not specified`));
        }
        return data$.pipe(
            catchError((err: unknown) => {
                // Clear cache entry in case of observable failure
                this.delete(key);
                return throwError(() => err);
            })
        );
    }
}
