/* eslint-disable @typescript-eslint/member-ordering, @angular-eslint/prefer-on-push-component-change-detection */
import { Component, input, TemplateRef } from '@angular/core';
import { get } from 'lodash-es';

@Component({
    selector: 'dynamic-refs',
    imports: [],
    // eslint-disable-next-line @angular-eslint/component-max-inline-declarations
    template: ''
})
export class DynamicRefsComponent {
    public readonly refs = input<Record<string, TemplateRef<HTMLElement>>>({});

    public getRef(key: string): TemplateRef<HTMLElement> {
        return get(this.refs(), key);
    }
}
