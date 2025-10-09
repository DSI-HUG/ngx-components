import { Provider } from '@angular/core';
import { provideNgxIntl } from '@hug/ngx-core';

import { NgxLayoutIntl } from './ngx-layout-intl';

export * from './ngx-layout-intl';

/**
 * The application initializer provider.
 * @param filesPath the path to translations asset files (default: `assets/translations/ngx-layout`).
 */
export const provideNgxLayout = (filesPath = 'assets/translations/ngx-layout'): Provider => provideNgxIntl(filesPath, NgxLayoutIntl);
