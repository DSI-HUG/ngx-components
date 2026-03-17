import { InjectionToken, type InputSignal, type ModelSignal, type TemplateRef } from '@angular/core';

export type FilterType = 'toggle' | 'complex';

interface HospitalityBaseFilter {
    readonly label: InputSignal<string>;
    readonly active: InputSignal<boolean>;
    readonly type: FilterType;
}

export interface HospitalityToggleFilter extends HospitalityBaseFilter {
    readonly type: 'toggle';
    readonly active: ModelSignal<boolean>;
}

export interface HospitalityComplexFilter extends HospitalityBaseFilter {
    readonly selectedFilterLabel: InputSignal<string>;
    readonly templateRef: TemplateRef<unknown>;
    readonly type: 'complex';
}

export type HospitalityFilter = HospitalityToggleFilter | HospitalityComplexFilter;

export const FILTER_TOKEN = new InjectionToken<HospitalityFilter>('FILTER_TOKEN');
