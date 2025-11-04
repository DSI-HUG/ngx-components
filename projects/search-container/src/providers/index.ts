import { Provider } from '@angular/core';
import { provideNgxIntl } from '@hug/ngx-core';

import { NgxSearchContainerIntl } from './ngx-search-container-intl';

export * from './ngx-search-container-intl';

/**
 * The application initializer provider.
 * @param filesPath the path to translations asset files (default: `assets/translations/ngx-search-container`).
 */
export const provideNgxSearchContainer = (filesPath = 'assets/translations/ngx-search-container'): Provider => provideNgxIntl(filesPath, NgxSearchContainerIntl);
