import { ChangeDetectionStrategy, Component, LOCALE_ID } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateFnsAdapter, MAT_DATE_FNS_FORMATS } from '@angular/material-date-fns-adapter';
import { frCH } from 'date-fns/locale';

import { NgxDatepickerMaskDirective } from './datepicker-mask.directive';

@Component({
    selector: 'lib-date-mask-host',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <input [matDatepicker]="picker" [formControl]="control" dateMask="dd.MM.yyyy"
            (dateChange)="dateChanges.push($event.value)" (dateInput)="dateInputs.push($event.value)" />
        <mat-datepicker #picker></mat-datepicker>
    `,
    imports: [ReactiveFormsModule, MatDatepickerModule, NgxDatepickerMaskDirective],
})
class HostComponent {
    public readonly control = new FormControl<Date | null>(new Date(2025, 11, 24));
    public readonly dateChanges: unknown[] = [];
    public readonly dateInputs: unknown[] = [];
}

describe('NgxDatepickerMaskDirective dateChange', () => {
    let fixture: ComponentFixture<HostComponent>;
    let input: HTMLInputElement;

    const nextTask = (): Promise<void> => new Promise(resolve => setTimeout(resolve));

    const key = async (k: string, code: string): Promise<void> => {
        input.dispatchEvent(new KeyboardEvent('keydown', { key: k, code, bubbles: true, cancelable: true }));
        await nextTask();
        fixture.detectChanges();
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HostComponent],
            providers: [
                { provide: LOCALE_ID, useValue: 'fr-CH' },
                { provide: MAT_DATE_LOCALE, useValue: frCH },
                { provide: MAT_DATE_FORMATS, useValue: MAT_DATE_FNS_FORMATS },
                { provide: DateAdapter, useClass: DateFnsAdapter, deps: [MAT_DATE_LOCALE] },
            ],
        }).compileComponents();
        fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
        await fixture.whenStable();
        input = (fixture.nativeElement as HTMLElement).getElementsByTagName('input')[0];
        input.focus();
        input.dispatchEvent(new FocusEvent('focus'));
        input.value = '24.12.2025';
        input.setSelectionRange(10, 10);
    });

    it('does not emit dateChange while the date typed is incomplete', async () => {
        await key('Backspace', 'Backspace');

        expect(input.value).toBe('24.12.202_');
        expect(fixture.componentInstance.control.value).toBeNull();
        expect(fixture.componentInstance.dateInputs).toEqual([null]);
        expect(fixture.componentInstance.dateChanges).toEqual([]);
    });

    it('emits the incomplete date as null on blur, once', async () => {
        await key('Backspace', 'Backspace');
        input.dispatchEvent(new FocusEvent('blur'));
        input.dispatchEvent(new FocusEvent('blur'));

        expect(fixture.componentInstance.dateChanges).toEqual([null]);
    });

    it('emits dateChange as soon as the date typed is complete and valid', async () => {
        await key('Backspace', 'Backspace');
        await key('6', 'Digit6');

        expect(input.value).toBe('24.12.2026');
        const changes = fixture.componentInstance.dateChanges;
        expect(changes.length).toBe(1);
        expect((changes[0] as Date).getFullYear()).toBe(2026);
    });

    it('does not emit dateChange when the date typed again is the one before', async () => {
        await key('Backspace', 'Backspace');
        await key('5', 'Digit5');
        input.dispatchEvent(new FocusEvent('blur'));

        expect(input.value).toBe('24.12.2025');
        expect(fixture.componentInstance.dateChanges).toEqual([]);
        expect(fixture.componentInstance.dateInputs.length).toBe(2);
    });

    it('emits dateChange at once when the field is cleared with Delete', async () => {
        await key('Delete', 'Delete');

        expect(fixture.componentInstance.control.value).toBeNull();
        expect(fixture.componentInstance.dateChanges).toEqual([null]);
    });
});
