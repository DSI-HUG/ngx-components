import { BaseHarnessFilters, ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';

/** Harness for interacting with a ngx message box in tests. */
export class NgxMessageBoxHarness extends ComponentHarness {

    // eslint-disable-next-line @typescript-eslint/naming-convention
    public static hostSelector = 'ngx-message-box';

    public static with(options: BaseHarnessFilters): HarnessPredicate<NgxMessageBoxHarness> {
        return new HarnessPredicate(NgxMessageBoxHarness, options);
    }

    public async getText(): Promise<string> {
        return (await this.host()).text();
    }
}
