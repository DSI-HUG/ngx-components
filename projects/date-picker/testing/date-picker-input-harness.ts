import { HarnessPredicate } from '@angular/cdk/testing';
import { InputHarnessFilters, MatInputHarness } from '@angular/material/input/testing';

/** Harness for interacting with a ngx date picker in tests. */
export class NgxDatePickerInputHarness extends MatInputHarness {
    public static override with(options?: InputHarnessFilters): HarnessPredicate<NgxDatePickerInputHarness> {
        return new HarnessPredicate(NgxDatePickerInputHarness, options ?? {});
    }

    public override async setValue(newValue: string): Promise<void> {
        const inputEl = await this.host();
        await inputEl.focus();

        if (newValue) {
            await inputEl.setInputValue(newValue);
            await inputEl.blur();
        }
        return inputEl.dispatchEvent('change');
    }
}
