import type { EnvironmentProviders } from '@angular/core';
import { type NgxOptionsIntl, provideNgxIntl } from '@hug/ngx-core';

import { NgxMessageBoxDialogIntl } from './ngx-message-box-dialog-intl';

export * from './ngx-message-box-dialog-intl';

/**
 * Provide the component to the application level.
 * @param options - The component's providing options.
 * @param options.translationsPath - The path to the translations files (default: `translations/ngx-message-box-dialog`).
 * @param options.customIntl - A custom internationalization class to inject.
 * @returns The environment providers to register at the application level.
 */
export const provideNgxMessageBoxDialog = (options?: NgxOptionsIntl<NgxMessageBoxDialogIntl>): EnvironmentProviders =>
    provideNgxIntl(
        NgxMessageBoxDialogIntl,
        options?.translationsPath ?? 'translations/ngx-message-box-dialog',
        options?.customIntl ?? NgxMessageBoxDialogIntl,
    );
