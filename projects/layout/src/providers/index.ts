import { EnvironmentProviders, inject, LOCALE_ID, provideAppInitializer } from '@angular/core';

import { NgxLayoutIntl } from './ngx-layout-intl';

export * from './ngx-layout-intl';

/**
 * The application initializer provider.
 * @param filesPath the path to translations asset files (default: `assets/translations/ngx-layout`).
 */
export const provideNgxLauyout = (filesPath = 'assets/translations/ngx-layout'): EnvironmentProviders =>
    provideAppInitializer(() => {
        const localeId = inject(LOCALE_ID);
        return inject(NgxLayoutIntl).init(localeId, filesPath);
    });
