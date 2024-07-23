import { NgModule } from '@angular/core';
import { TruthyTypesOf } from 'rxjs';

declare global {
    interface Array<T> {
        // eslint-disable-next-line @typescript-eslint/method-signature-style
        filter(predicate: (value: T, index: number, array: T[]) => boolean, thisArg?: unknown): TruthyTypesOf<T>[];

        // eslint-disable-next-line @typescript-eslint/method-signature-style
        filterMap<U>(predicate: (value: T, index: number, array: T[]) => U | undefined, thisArg?: unknown): TruthyTypesOf<U>[];
    }

    interface ReadonlyArray<T> {
        // eslint-disable-next-line @typescript-eslint/method-signature-style
        filter(predicate: (value: T, index: number, array: readonly T[]) => boolean, thisArg?: unknown): TruthyTypesOf<T>[];

        // eslint-disable-next-line @typescript-eslint/method-signature-style
        filterMap<U>(predicate: (value: T, index: number, array: readonly T[]) => U | undefined, thisArg?: unknown): TruthyTypesOf<U>[];
    }
}

@NgModule()
export class NgxCustomArrayModule {
    public constructor() {
        (Array.prototype as void[]).filterMap = function <T, U>(this: T[], predicate: (value: T, index: number, _array: T[]) => U | undefined): TruthyTypesOf<U>[] {
            return this.map(predicate).filter(v => v !== undefined);
        };
    }
}
