import { Dialog, DIALOG_SCROLL_STRATEGY_PROVIDER } from '@angular/cdk/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { enableProdMode } from '@angular/core';
import { MAT_DIALOG_SCROLL_STRATEGY_PROVIDER, MatDialog } from '@angular/material/dialog';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { provideG11n, withInterceptor } from '@hug/ngx-g11n/legacy';
import { withDefaultLocales } from '@hug/ngx-g11n/locales';
import { withDateFnsMaterial } from '@hug/ngx-g11n/material';
import { NgxLayoutIntl, provideNgxLayout } from '@hug/ngx-layout';

import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        provideAnimations(),
        provideRouter(appRoutes, withPreloading(PreloadAllModules)),
        MatDialog,
        Overlay,
        MAT_DIALOG_SCROLL_STRATEGY_PROVIDER,
        Dialog,
        DIALOG_SCROLL_STRATEGY_PROVIDER,
        provideG11n(
            withDefaultLocales(),
            withDateFnsMaterial(),
            withInterceptor()
        ),
        NgxLayoutIntl,
        provideNgxLayout()
    ]
}).catch(err => console.error(err));
