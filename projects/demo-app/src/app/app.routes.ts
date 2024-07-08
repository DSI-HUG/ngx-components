import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'message-box', pathMatch: 'full' },
    { path: 'overlay', loadComponent: () => import('./overlay/overlay-demo.component').then(m => m.OverlayDemoComponent), data: { title: 'Overlay' } },
    { path: 'message-box', loadComponent: () => import('./message-box/message-box-demo.component').then(m => m.MessageBoxDemoComponent), data: { title: 'Message Box' } },
    { path: '**', redirectTo: 'message-box', pathMatch: 'prefix' }
];
