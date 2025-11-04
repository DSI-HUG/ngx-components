import { EnvironmentProviders } from '@angular/core';
import { provideNgxIntl } from '@hug/ngx-core';

import { NgxMessageBoxDialogIntl } from './ngx-message-box-dialog-intl';

export * from './ngx-message-box-dialog-intl';

/**
 * The application initializer provider.
 * @param filesPath the path to translations asset files (default: `public/translations/ngx-message-box-dialog`).
 */
export const provideNgxMessageBoxDialog = (filesPath = 'public/translations/ngx-message-box-dialog'): EnvironmentProviders => provideNgxIntl(filesPath, NgxMessageBoxDialogIntl);
