import { HarnessPredicate, TestKey } from '@angular/cdk/testing';
import { MatFormFieldControlHarness } from '@angular/material/form-field/testing/control';
import { MatInputHarness } from '@angular/material/input/testing';

import { NgxTimePickerHarnessFilters } from './time-picker-harness-filters';

/** Harness for interacting with a ngx time picker in tests. */
export class NgxTimePickerHarness extends MatFormFieldControlHarness {

    // eslint-disable-next-line @typescript-eslint/naming-convention
    public static hostSelector = 'ngx-time-picker';

    static with(options: NgxTimePickerHarnessFilters = {}): HarnessPredicate<NgxTimePickerHarness> {
        return new HarnessPredicate(NgxTimePickerHarness, options).addOption('value', options.value, (harness, value) => HarnessPredicate.stringMatches(harness.getValue(), value));
    }

    public async getHoursInput(): Promise<MatInputHarness> {
        return (await this.locatorFactory.harnessLoaderFor('.hours')).getHarness(MatInputHarness.with({ selector: '[matInput]' }));
    }

    public async getMinutesInput(): Promise<MatInputHarness> {
        return (await this.locatorFactory.harnessLoaderFor('.minutes')).getHarness(MatInputHarness.with({ selector: '[matInput]' }));
    }

    public async setValue(value: string): Promise<void> {
        const hoursMinutes = value.split(':');

        if (hoursMinutes[0].length) {
            await this.getHoursInput().then(async hoursInput => {
                await hoursInput.host().then(async hoursElement => {
                    await hoursElement.clear();
                    await hoursInput.setValue(hoursMinutes[0]);
                    await hoursInput.blur();
                });
            });
        }

        if (hoursMinutes[1].length) {
            await this.getMinutesInput().then(async minutesInput => {
                await minutesInput.host().then(async minutesElement => {
                    await minutesElement.clear();
                    await minutesInput.setValue(hoursMinutes[1]);
                    await minutesElement.blur();
                });
            });
        }
    }

    public async getValue(): Promise<string> {
        return this.getHoursValue().then(hoursValue => this.getMinutesValue().then(minutesValue => `${hoursValue}:${minutesValue}`));
    }

    public async getHoursValue(): Promise<string> {
        return this.getHoursInput().then(hoursInput => hoursInput.getValue());
    }

    public async getMinutesValue(): Promise<string> {
        return this.getMinutesInput().then(minutesInput => minutesInput.getValue());
    }

    public async sendKeysToHoursInput(...keys: readonly TestKey[]): Promise<void> {
        return this.getHoursInput().then(async hoursInput => {
            await hoursInput.host().then(async hoursElement => {
                await hoursElement.sendKeys(...keys);
            });
        });
    }

    public async sendKeysToMinutesInput(...keys: readonly TestKey[]): Promise<void> {
        return this.getMinutesInput().then(async minutesInput => {
            await minutesInput.host().then(async minutesElement => {
                await minutesElement.sendKeys(...keys);
            });
        });
    }
}
