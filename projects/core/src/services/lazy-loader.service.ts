import { ComponentType } from '@angular/cdk/portal';
import { Injectable, Injector, Type, ɵcreateInjector as createInjector } from '@angular/core';
import { Observable, from, map } from 'rxjs';

export interface LoadModuleInfos<T> {
    injector: Injector;
    module: T;
}

export abstract class NgxAbstractLazyModule<Component> {
    public constructor(
        public componentType: ComponentType<Component>
    ) {}
}

@Injectable({
    providedIn: 'root'
})
export class NgxLazyLoaderService {
    public constructor(
        private injector: Injector
    ) {}

    public loadModule$<T extends NgxAbstractLazyModule<unknown>>(path: Promise<Type<T>>, parentInjector?: Injector): Observable<LoadModuleInfos<T>> {
        return from(path).pipe(
            map(elementModuleOrFactory => {
                const injector = createInjector(elementModuleOrFactory, parentInjector ?? this.injector);
                return {
                    injector,
                    module: injector.get(elementModuleOrFactory)
                };
            })
        );
    }
}
