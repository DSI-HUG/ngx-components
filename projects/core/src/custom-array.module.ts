import { NgModule } from '@angular/core';

declare global {
    interface Array<T> {
        // eslint-disable-next-line @typescript-eslint/method-signature-style
        filterMap<U>(predicate: (value: T, index: number, array: T[]) => U | undefined, thisArg?: unknown): Exclude<U, undefined>[];
    }

    interface ReadonlyArray<T> {
        // eslint-disable-next-line @typescript-eslint/method-signature-style
        filterMap<U>(predicate: (value: T, index: number, array: readonly T[]) => U | undefined, thisArg?: unknown): Exclude<U, undefined>[];
    }
}

@NgModule()
export class NgxCustomArrayModule {
    public constructor() {
        (Array.prototype as void[]).filterMap = function <T, U>(
            this: T[],
            predicate: (value: T, index: number, array: T[]) => U | undefined
        ): Exclude<U, undefined>[] {
            return this.map(predicate).filter(
                (value): value is Exclude<U, undefined> => value !== undefined
            );
        };
    }
}
