import { Provider } from '@angular/core';
import { provideNgxIntl } from '@hug/ngx-core';

import { NgxMessageBoxDialogIntl } from './ngx-message-box-dialog-intl';

export * from './ngx-message-box-dialog-intl';

/**
 * The application initializer provider.
 * @param filesPath the path to translations asset files (default: `assets/translations/ngx-message-box-dialog`).
 */
export const provideNgxMessageBoxDialog = (filesPath = 'assets/translations/ngx-message-box-dialog'): Provider => provideNgxIntl(filesPath, NgxMessageBoxDialogIntl);
