import { BaseHarnessFilters, ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';

/** Harness for interacting with a ngx time picker in tests. */
export class NgxDatePickerButtonsHarness extends ComponentHarness {

    // eslint-disable-next-line @typescript-eslint/naming-convention
    public static hostSelector = 'ngx-datepicker-buttons';

    public static with(options?: BaseHarnessFilters): HarnessPredicate<NgxDatePickerButtonsHarness> {
        return new HarnessPredicate(NgxDatePickerButtonsHarness, options ?? {});
    }

    public async clickToday(): Promise<void> {
        const button = this.locatorFor('[data-cy="dtp-today"]');
        return (await button()).click();
    }

    public async clickClear(): Promise<void> {
        const button = this.locatorFor('[data-cy="dtp-clear"]');
        return (await button()).click();
    }

    public async clickOpen(): Promise<void> {
        const button = this.locatorFor('[data-cy="dtp-open"]');
        return (await button()).click();
    }
}
