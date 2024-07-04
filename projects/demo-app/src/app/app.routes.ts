import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'overlay', pathMatch: 'full' },
    { path: 'overlay', loadComponent: () => import('./overlay/overlay-demo.component').then(m => m.OverlayDemoComponent), data: { title: 'Overlay' } },
    { path: '**', redirectTo: 'overlay', pathMatch: 'prefix' }
];
