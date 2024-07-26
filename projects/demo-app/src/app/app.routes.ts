import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'message-box', pathMatch: 'full' },
    { path: 'message-box', loadComponent: () => import('./message-box/message-box-demo.component').then(m => m.MessageBoxDemoComponent), data: { title: 'Message Box' } },
    { path: 'numeric-stepper', loadComponent: () => import('./numeric-stepper/numeric-stepper-demo.component').then(m => m.NumericStepperDemoComponent), data: { title: 'Numeric Stepper' } },
    { path: 'overlay', loadComponent: () => import('./overlay/overlay-demo.component').then(m => m.OverlayDemoComponent), data: { title: 'Overlay' } },
    { path: 'snackbar', loadComponent: () => import('./snackbar/snackbar-demo.component').then(m => m.SnackbarDemoComponent), data: { title: 'Snackbar' } },
    { path: 'splitter', loadComponent: () => import('./splitter/splitter-demo.component').then(m => m.SplitterDemoComponent), data: { title: 'Splitter' } },
    { path: 'time-picker', loadComponent: () => import('./time-picker/time-picker-demo.component').then(m => m.TimePickerDemoComponent), data: { title: 'Time Picker' } },
    { path: 'layout', loadComponent: () => import('./layout/layout-demo.component').then(m => m.LayoutDemoComponent), data: { title: 'Layout' } },
    { path: '**', redirectTo: 'message-box', pathMatch: 'prefix' }
];
