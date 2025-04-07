/* eslint-disable @typescript-eslint/naming-convention */
import { inject, InjectionToken, Provider } from '@angular/core';

import { NavButton } from '../components';

export const PARENT_NAV_BUTTON = new InjectionToken<NavButton | null>('PARENT_NAV_BUTTON');
export const NAV_BUTTON = new InjectionToken<NavButton>('NAV_BUTTON');
export const provideNavButtonTokens = (type: typeof NavButton): Provider[] => [
    {
        provide: NAV_BUTTON,
        useFactory: (): NavButton => inject(type)
    },
    {
        provide: PARENT_NAV_BUTTON,
        useFactory: (): NavButton | null =>
            inject(NAV_BUTTON, {
                optional: true,
                host: true,
                skipSelf: true
            })
    }
];
