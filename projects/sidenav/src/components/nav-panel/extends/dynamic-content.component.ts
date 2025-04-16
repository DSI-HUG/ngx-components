/* eslint-disable @typescript-eslint/member-ordering */
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    Signal,
    TemplateRef,
    viewChild,
    ViewContainerRef
} from '@angular/core';
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
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicContentComponent extends OpenableComponent {
    private dynamicContainer: Signal<ViewContainerRef> = viewChild.required('dynamicContainer', { read: ViewContainerRef });

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
            const dynamicContainer = this.dynamicContainer();
            if (dynamicContainer) {
                dynamicContainer.clear();
                (content ?? this.contents()).forEach((template: TemplateRef<unknown>) =>
                    dynamicContainer.createEmbeddedView(template)
                );
            }
        });
    }

    public setContent(param?: TemplateRef<unknown> | TemplateRef<unknown>[]): void {
        this._contents = isArray(param) ? param : ([
            param
        ] as TemplateRef<unknown>[]);
    }
}
