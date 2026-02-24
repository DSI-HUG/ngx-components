import type { EnvironmentProviders } from '@angular/core';
import { type NgxOptionsIntl, provideNgxIntl } from '@hug/ngx-core';

import { NgxStatusIntl } from './ngx-status-intl';

export * from './ngx-status-intl';

/**
 * Provide the component to the application level.
 * @param options - The component's providing options.
 * @param options.translationsPath - The path to the translations files (default: `translations/ngx-status`).
 * @param options.customIntl - A custom internationalization class to inject.
 */
export const provideNgxStatus = (options?: NgxOptionsIntl<NgxStatusIntl>): EnvironmentProviders =>
    provideNgxIntl(
        NgxStatusIntl,
        options?.translationsPath ?? 'translations/ngx-status',
        options?.customIntl ?? NgxStatusIntl
    );
