import { ComponentType } from '@angular/cdk/portal';
import { Injectable, Injector, ɵcreateInjector as createInjector, Type } from '@angular/core';
import { from, map, Observable } from 'rxjs';

export interface LoadModuleInfos<T> {
    injector: Injector;
    module: T;
}

export abstract class AbstractLazyModule<Component> {
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

    public loadModule$<T extends AbstractLazyModule<unknown>>(path: Promise<Type<T>>, parentInjector?: Injector): Observable<LoadModuleInfos<T>> {
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
