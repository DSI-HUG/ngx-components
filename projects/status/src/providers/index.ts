import { Provider } from '@angular/core';
import { provideNgxIntl } from '@hug/ngx-core';

import { NgxStatusIntl } from './ngx-status-intl';

export * from './ngx-status-intl';

/**
 * The application initializer provider.
 * @param filesPath the path to translations asset files (default: `assets/translations/ngx-status`).
 */
export const provideNgxStatus = (filesPath = 'assets/translations/ngx-status'): Provider => provideNgxIntl(filesPath, NgxStatusIntl);
