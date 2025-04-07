import { Type } from '@angular/core';
import { Routes } from '@angular/router';

const pages: Routes = [
    {
        path: 'page1',
        loadComponent: (): Promise<Type<unknown>> => import('./empty/empty.component').then(m => m.EmptyComponent)
    },
    {
        path: 'page2',
        loadComponent: (): Promise<Type<unknown>> => import('./empty/empty.component').then(m => m.EmptyComponent)
    },
    {
        path: 'page3',
        loadComponent: (): Promise<Type<unknown>> => import('./empty/empty.component').then(m => m.EmptyComponent)
    },
    {
        path: 'page4',
        loadComponent: (): Promise<Type<unknown>> => import('./empty/empty.component').then(m => m.EmptyComponent)
    }
];
const subgroups: Routes = [
    {
        path: 'subgroup1',
        loadComponent: (): Promise<Type<unknown>> => import('./empty/empty.component').then(m => m.EmptyComponent),
        children: [
            ...pages
        ]
    },
    {
        path: 'subgroup2',
        loadComponent: (): Promise<Type<unknown>> => import('./empty/empty.component').then(m => m.EmptyComponent),
        children: [
            ...pages
        ]
    },
    {
        path: 'subgroup3',
        loadComponent: (): Promise<Type<unknown>> => import('./empty/empty.component').then(m => m.EmptyComponent),
        children: [
            ...pages
        ]
    },
    {
        path: 'subgroup4',
        loadComponent: (): Promise<Type<unknown>> => import('./empty/empty.component').then(m => m.EmptyComponent),
        children: [
            ...pages
        ]
    }
];
const groups: Routes = [
    {
        path: 'group1',
        loadComponent: (): Promise<Type<unknown>> => import('./empty/empty.component').then(m => m.EmptyComponent),
        children: [
            ...subgroups,
            ...pages
        ]
    },
    {
        path: 'group2',
        loadComponent: (): Promise<Type<unknown>> => import('./empty/empty.component').then(m => m.EmptyComponent),
        children: [
            ...subgroups,
            ...pages
        ]
    },
    {
        path: 'group3',
        loadComponent: (): Promise<Type<unknown>> => import('./empty/empty.component').then(m => m.EmptyComponent),
        children: [
            ...subgroups,
            ...pages
        ]
    },
    {
        path: 'group4',
        loadComponent: (): Promise<Type<unknown>> => import('./empty/empty.component').then(m => m.EmptyComponent),
        children: [
            ...subgroups,
            ...pages
        ]
    }
];
const items: Routes = [
    {
        path: 'item1',
        loadComponent: (): Promise<Type<unknown>> => import('./empty/empty.component').then(m => m.EmptyComponent),
        children: [
            ...groups,
            ...pages
        ]
    },
    {
        path: 'item2',
        loadComponent: (): Promise<Type<unknown>> => import('./empty/empty.component').then(m => m.EmptyComponent),
        children: [
            ...groups,
            ...pages
        ]
    },
    {
        path: 'item3',
        loadComponent: (): Promise<Type<unknown>> => import('./empty/empty.component').then(m => m.EmptyComponent),
        children: [
            ...groups,
            ...pages
        ]
    },
    {
        path: 'item4',
        loadComponent: (): Promise<Type<unknown>> => import('./empty/empty.component').then(m => m.EmptyComponent),
        children: [
            ...groups,
            ...pages
        ]
    }
];
export const sidenavRoutes: Routes = [
    ...items,
    ...pages
];
