import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgxDatePipe } from '@hug/ngx-core';
import { frCH } from 'date-fns/locale';


describe('NgxDatePipe', () => {

    let pipe: NgxDatePipe;

    beforeEach(() => {
        registerLocaleData(frCH, 'frCH');

        TestBed.configureTestingModule({
            providers: [
                {
                    provide: LOCALE_ID,
                    useValue: 'frCH'
                },
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
