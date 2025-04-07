/* eslint-disable @typescript-eslint/member-ordering, @angular-eslint/prefer-on-push-component-change-detection */
import { Component, computed, effect, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { isArray } from 'lodash-es';

import { provideOpenableTokens } from '../../../tokens/openable.tokens';
import { OpenableComponent } from './openable.component';

@Component({
    selector: 'ngx-dynamic-content',
    providers: [
        provideOpenableTokens(DynamicContentComponent)
    ],
    template: `
        <ng-content></ng-content>
        <ng-container #dynamicContainer></ng-container>
    `
})
export class DynamicContentComponent extends OpenableComponent {
    @ViewChild('dynamicContainer', { read: ViewContainerRef, static: true })
    private dynamicContainer!: ViewContainerRef;

    // # Computed
    public readonly contents = computed<TemplateRef<unknown>[]>(() =>
        this.groupService.getPanelContent(this.groupInfo())
    );

    // # Properties
    private _contents?: TemplateRef<unknown>[];

    public constructor() {
        super();
        // Resolve content
        const content = this._contents;
        effect(() => {
            this.dynamicContainer.clear();
            (content ?? this.contents()).forEach((template: TemplateRef<unknown>) =>
                this.dynamicContainer.createEmbeddedView(template)
            );
        });
    }

    public setContent(param?: TemplateRef<unknown> | TemplateRef<unknown>[]): void {
        this._contents = isArray(param) ? param : ([
            param
        ] as TemplateRef<unknown>[]);
    }
}
