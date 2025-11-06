import type { EnvironmentProviders } from '@angular/core';
import { type NgxOptionsIntl, provideNgxIntl } from '@hug/ngx-core';

import { NgxUserCardIntl } from './ngx-user-card-intl';

export * from './ngx-user-card-intl';

/**
 * Provide the component to the application level.
 * @param options - The component's providing options.
 * @param options.translationsPath - The path to the translations files (default: `translations/ngx-user-card`).
 * @param options.customIntl - A custom internationalization class to inject.
 */
export const provideNgxUserCard = (options?: NgxOptionsIntl<NgxUserCardIntl>): EnvironmentProviders =>
    provideNgxIntl(
        NgxUserCardIntl,
        options?.translationsPath ?? 'translations/ngx-user-card',
        options?.customIntl ?? NgxUserCardIntl
    );
