import { BaseHarnessFilters } from '@angular/cdk/testing';

export interface NgxTimePickerHarnessFilters extends BaseHarnessFilters {
    value?: string | RegExp;
}
