import { registerLocaleData } from '@angular/common';
// eslint-disable-next-line @typescript-eslint/naming-convention
import localeFrCH from '@angular/common/locales/fr-CH';
import { LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DateFnsAdapter, MAT_DATE_FNS_FORMATS } from '@angular/material-date-fns-adapter';
import { NgxDatePipe } from '@hug/ngx-core';
import { setDefaultOptions } from 'date-fns';
import { frCH } from 'date-fns/locale';

describe('NgxDatePipe', () => {

    let pipe: NgxDatePipe;

    beforeEach(() => {
        registerLocaleData(localeFrCH, 'fr-CH');
        setDefaultOptions({ locale: frCH });
        TestBed.configureTestingModule({
            providers: [
                { provide: MAT_DATE_LOCALE, useValue: frCH },
                { provide: LOCALE_ID, useValue: 'fr-CH' },
                { provide: MAT_DATE_FORMATS, useValue: MAT_DATE_FNS_FORMATS },
                { provide: DateAdapter, useClass: DateFnsAdapter, deps: [MAT_DATE_LOCALE] },
                {
                    provide: NgxDatePipe,
                    useClass: NgxDatePipe
                }
            ]
        });

        pipe = TestBed.inject(NgxDatePipe);
    });
    it('should create an instance', () => {
        const date = new Date('2000/12/31');
        expect(pipe.transform(date, 'P')).toEqual('31.12.2000');
    });

});
