import { EnvironmentProviders } from '@angular/core';
import { provideNgxIntl } from '@hug/ngx-core';

import { NgxLayoutIntl } from './ngx-layout-intl';

export * from './ngx-layout-intl';

/**
 * The application initializer provider.
 * @param filesPath the path to translations asset files (default: `public/translations/ngx-layout`).
 */
export const provideNgxLayout = (filesPath = 'public/translations/ngx-layout'): EnvironmentProviders => provideNgxIntl(filesPath, NgxLayoutIntl);
