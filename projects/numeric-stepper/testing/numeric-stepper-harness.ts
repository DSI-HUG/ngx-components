
import { HarnessPredicate, TestKey } from '@angular/cdk/testing';
import { InputHarnessFilters, MatInputHarness } from '@angular/material/input/testing';

/** Harness for interacting with a ngx numeric stepper in tests. */
export class NgxNumericStepperHarness extends MatInputHarness {
    public static override with(options?: InputHarnessFilters): HarnessPredicate<NgxNumericStepperHarness> {
        return new HarnessPredicate(NgxNumericStepperHarness, options ?? {});
    }

    public async increment(): Promise<void> {
        const inputEl = await this.host();
        await inputEl.sendKeys(TestKey.UP_ARROW);
        // Wait debounce time
        await new Promise(resolve => setTimeout(resolve, 15));
    }

    public async decrement(): Promise<void> {
        const inputEl = await this.host();
        await inputEl.sendKeys(TestKey.DOWN_ARROW);
        // Wait debounce time
        await new Promise(resolve => setTimeout(resolve, 15));
    }
}

