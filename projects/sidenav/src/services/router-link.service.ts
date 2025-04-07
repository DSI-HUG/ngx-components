/* eslint-disable @typescript-eslint/member-ordering */
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, UrlTree } from '@angular/router';
import { isArray } from 'lodash-es';
import { filter } from 'rxjs';

@Injectable()
export class RouterLinkService {
    // # Injects
    private readonly router = inject(Router);
    // # Signals
    public readonly urlUpdated = toSignal(this.router.events.pipe(filter(event => event instanceof NavigationEnd)));

    public isActive(pRouterLinkPaths: string | string[]): boolean {
        const routerLinkPaths = isArray(pRouterLinkPaths) ? pRouterLinkPaths : [
            pRouterLinkPaths
        ];
        const tree: UrlTree = this.router.createUrlTree(routerLinkPaths);
        return this.router.isActive(tree, {
            paths: 'subset',
            queryParams: 'ignored',
            fragment: 'ignored',
            matrixParams: 'ignored'
        });
    }
}
