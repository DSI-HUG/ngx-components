/* eslint-disable @typescript-eslint/naming-convention */
import { inject, InjectionToken, Provider } from '@angular/core';

import { OpenableComponent } from '../components';

export const PARENT_OPENABLE = new InjectionToken<OpenableComponent | null>('PARENT_OPENABLE');
export const OPENABLE = new InjectionToken<OpenableComponent>('OPENABLE');
export const provideOpenableTokens = (type: typeof OpenableComponent): Provider[] => [
    {
        provide: OPENABLE,
        useFactory: (): OpenableComponent => inject(type)
    },
    {
        provide: PARENT_OPENABLE,
        useFactory: (): OpenableComponent | null =>
            inject(OPENABLE, {
                optional: true,
                host: true,
                skipSelf: true
            })
    }
];
