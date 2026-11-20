import type { EnvironmentProviders } from '@angular/core';
import { type NgxOptionsIntl, provideNgxIntl } from '@hug/ngx-core';

import { NgxSearchContainerIntl } from './ngx-search-container-intl';

export * from './ngx-search-container-intl';

/**
 * Provide the component to the application level.
 * @param options - The component's providing options.
 * @param options.translationsPath - The path to the translations files (default: `translations/ngx-search-container`).
 * @param options.customIntl - A custom internationalization class to inject.
 * @returns The environment providers to register at the application level.
 */
export const provideNgxSearchContainer = (options?: NgxOptionsIntl<NgxSearchContainerIntl>): EnvironmentProviders =>
    provideNgxIntl(
        NgxSearchContainerIntl,
        options?.translationsPath ?? 'translations/ngx-search-container',
        options?.customIntl ?? NgxSearchContainerIntl,
    );
