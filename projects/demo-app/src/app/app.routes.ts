import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'message-box', pathMatch: 'full' },
    { path: 'date-picker', loadComponent: () => import('./date-picker/date-picker-demo.component').then(m => m.DatePickerDemoComponent), data: { title: 'Date Picker Box' } },
    { path: 'message-box', loadComponent: () => import('./message-box/message-box-demo.component').then(m => m.MessageBoxDemoComponent), data: { title: 'Message Box' } },
    { path: 'numeric-stepper', loadComponent: () => import('./numeric-stepper/numeric-stepper-demo.component').then(m => m.NumericStepperDemoComponent), data: { title: 'Numeric Stepper' } },
    { path: 'overlay', loadComponent: () => import('./overlay/overlay-demo.component').then(m => m.OverlayDemoComponent), data: { title: 'Overlay' } },
    { path: 'snackbar', loadComponent: () => import('./snackbar/snackbar-demo.component').then(m => m.SnackbarDemoComponent), data: { title: 'Snackbar' } },
    { path: 'splitter', loadComponent: () => import('./splitter/splitter-demo.component').then(m => m.SplitterDemoComponent), data: { title: 'Splitter' } },
    { path: 'time-picker', loadComponent: () => import('./time-picker/time-picker-demo.component').then(m => m.TimePickerDemoComponent), data: { title: 'Time Picker' } },
    { path: 'layout', loadComponent: () => import('./layout/layout-demo.component').then(m => m.LayoutDemoComponent), data: { title: 'Layout' } },
    { path: 'list-loader', loadComponent: () => import('./list-loader/list-loader-demo.component').then(m => m.ListLoaderDemoComponent), data: { title: 'List Loader' } },
    { path: 'search-container', loadComponent: () => import('./search-container/search-container-demo.component').then(m => m.SearchContainerDemoComponent), data: { title: 'Search container' } },
    { path: 'user-card', loadComponent: () => import('./user-card/user-card-demo.component').then(m => m.UserCardDemoComponent), data: { title: 'User Card' } },
    { path: 'user-tooltip', loadComponent: () => import('./user-tooltip/user-tooltip-demo.component').then(m => m.UserTooltipDemoComponent), data: { title: 'User Tooltip' } },
    { path: 'tooltip', loadComponent: () => import('./tooltip/tooltip-demo.component').then(m => m.TooltipDemoComponent), data: { title: 'Tooltip' } },
    { path: 'status', loadComponent: () => import('./status/status-demo.component').then(m => m.StatusDemoComponent), data: { title: 'Status' } },
    { path: 'input-autosize', loadComponent: () => import('./input-autosize/input-autosize-demo.component').then(m => m.InputAutosizeDemoComponent), data: { title: 'Status' } },
    { path: '**', redirectTo: 'message-box', pathMatch: 'prefix' }
];
