import { EnvironmentProviders } from '@angular/core';
import { provideNgxIntl } from '@hug/ngx-core';

import { NgxUserCardIntl } from './ngx-user-card-intl';

export * from './ngx-user-card-intl';

/**
 * The application initializer provider.
 * @param filesPath the path to translations asset files (default: `public/translations/ngx-user-card`).
 */
export const provideNgxUserCard = (filesPath = 'public/translations/ngx-user-card'): EnvironmentProviders => provideNgxIntl(filesPath, NgxUserCardIntl);
