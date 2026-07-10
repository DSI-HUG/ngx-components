import { inject, Injector, runInInjectionContext } from '@angular/core';
import type { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, GuardResult, MaybeAsync, Route, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { from, isObservable, type Observable, of, switchMap } from 'rxjs';

/**
 * @param guards the guards
 * @returns the chained results of the guards until first condition is not met
 */
export const chainActivateGuards = (...guards: CanActivateFn[]): CanActivateFn => (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> => chainGuards$(guard$ => guard$(route, state), guards);

/**
 * run sequentially the guards until one condition is not met
 * @param guards the guards
 * @returns the chained results of the guards until first condition is not met
 */
export const chainMatchGuards = (...guards: CanMatchFn[]): CanMatchFn => (route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> => chainGuards$(guard$ => guard$(route, segments), guards);

/**
 * @param applyGuard$ result of previous guard
 * @param guards the guards to apply
 * @returns the chained results of the guards until first condition is not met
 */
const chainGuards$ = <T>(applyGuard$: (guard: T) => MaybeAsync<GuardResult>, guards: T[]): MaybeAsync<GuardResult> => {
    const injectionContext = inject(Injector);
    return guards.reduce((acc$: Observable<GuardResult>, guard) => acc$.pipe(switchMap(result => result
        ? runInInjectionContext(injectionContext, () => toObservable$(applyGuard$(guard)))
        : of(result))), of(true));
};

/**
 * @param input$ maybe asyncs to convert to observables
 * @returns an observable
 */
const toObservable$ = <T>(input$: MaybeAsync<T>): Observable<T> => {
    if (isObservable(input$)) {
        return input$;
    }
    return input$ instanceof Promise ? from(input$) : of(input$);
};
