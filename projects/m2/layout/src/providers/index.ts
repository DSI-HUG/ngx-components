import type { EnvironmentProviders } from '@angular/core';
import { type NgxOptionsIntl, provideNgxIntl } from '@hug/ngx-core';

import { NgxLayoutIntl } from './ngx-layout-intl';

export * from './ngx-layout-intl';

/**
 * Provide the component to the application level.
 * @param options - The component's providing options.
 * @param options.translationsPath - The path to the translations files (default: `translations/ngx-layout`).
 * @param options.customIntl - A custom internationalization class to inject.
 */
export const provideNgxLayout = (options?: NgxOptionsIntl<NgxLayoutIntl>): EnvironmentProviders =>
    provideNgxIntl(
        NgxLayoutIntl,
        options?.translationsPath ?? 'translations/ngx-layout',
        options?.customIntl ?? NgxLayoutIntl
    );
