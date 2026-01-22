import { registerLocaleData } from '@angular/common';
import localeFrChExtra from '@angular/common/locales/extra/fr-CH';
import localeFrCh from '@angular/common/locales/fr-CH';
import { LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DateFnsAdapter, MAT_DATE_FNS_FORMATS } from '@angular/material-date-fns-adapter';
import { setDefaultOptions } from 'date-fns';
import { frCH } from 'date-fns/locale';

import { NgxDateFnsPipe } from './ngx-date-fns.pipe';

describe('NgxDateFnsPipe', () => {

    let pipe: NgxDateFnsPipe;

    beforeEach(() => {
        registerLocaleData(localeFrCh, 'fr-CH', localeFrChExtra);
        setDefaultOptions({ locale: frCH });
        TestBed.configureTestingModule({
            providers: [
                { provide: LOCALE_ID, useValue: 'fr-CH' },
                { provide: MAT_DATE_LOCALE, useValue: frCH },
                { provide: MAT_DATE_FORMATS, useValue: MAT_DATE_FNS_FORMATS },
                { provide: DateAdapter, useClass: DateFnsAdapter, deps: [MAT_DATE_LOCALE] },
                {
                    provide: NgxDateFnsPipe,
                    useClass: NgxDateFnsPipe
                }
            ]
        });

        pipe = TestBed.inject(NgxDateFnsPipe);
    });

    it('should format Date correctly', () => {
        const date = new Date(2025, 11, 31, 17, 46, 39, 123);
        expect(pipe.transform(date, 'P')).toEqual('31.12.2025');
        expect(pipe.transform(date, 'PP')).toEqual('31 déc. 2025');
        expect(pipe.transform(date, 'Pp')).toEqual('31.12.2025, 17:46');
        expect(pipe.transform(date, 'PPPp')).toEqual('31 décembre 2025 à 17:46');
        expect(pipe.transform(date, 'PPPPpppp')).toEqual('mercredi 31 décembre 2025 à 17:46:39 GMT+01:00');
    });

});
