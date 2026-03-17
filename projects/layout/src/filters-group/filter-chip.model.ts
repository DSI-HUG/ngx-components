import { InjectionToken, type InputSignal, type ModelSignal, type TemplateRef } from '@angular/core';

export type FilterType = 'toggle' | 'complex';

interface NgxBaseFilter {
    readonly label: InputSignal<string>;
    readonly active: InputSignal<boolean>;
    readonly type: FilterType;
}

export interface NgxToggleFilter extends NgxBaseFilter {
    readonly type: 'toggle';
    readonly active: ModelSignal<boolean>;
}

export interface NgxComplexFilter extends NgxBaseFilter {
    readonly selectedFilterLabel: InputSignal<string>;
    readonly templateRef: TemplateRef<unknown>;
    readonly type: 'complex';
}

export type NgxFilter = NgxToggleFilter | NgxComplexFilter;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const FILTER_TOKEN = new InjectionToken<NgxFilter>('FILTER_TOKEN');
