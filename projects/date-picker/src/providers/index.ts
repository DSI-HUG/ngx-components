import { EnvironmentProviders } from '@angular/core';
import { NgxOptionsIntl, provideNgxIntl } from '@hug/ngx-core';

import { NgxDatePickerIntl } from './ngx-date-picker-intl';

export * from './ngx-date-picker-intl';

/**
 * Provide the component to the application level.
 * @param options - The component's providing options.
 * @param options.translationsPath - The path to the translations files (default: `translations/ngx-date-picker`).
 * @param options.customIntl - A custom internationalization class to inject.
 */
export const provideNgxDatePicker = (options?: NgxOptionsIntl<NgxDatePickerIntl>): EnvironmentProviders =>
    provideNgxIntl(
        NgxDatePickerIntl,
        options?.translationsPath ?? 'translations/ngx-date-picker',
        options?.customIntl ?? NgxDatePickerIntl
    );
