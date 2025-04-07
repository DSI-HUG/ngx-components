import { TemplateRef } from '@angular/core';

import { OpenableComponent } from '../components';

export interface PartialPanelContent {
    panel: OpenableComponent;
    content?: TemplateRef<unknown>;
}

export class PanelContent {
    public constructor(
        public panel: OpenableComponent,
        public content?: TemplateRef<unknown>
    ) {}

    public static isEqual(a: PanelContent, b: PartialPanelContent): boolean {
        return a.panel === b.panel && a.content === b.content;
    }

    public static isPanelEqual(a: PanelContent, b: PartialPanelContent): boolean {
        return a.panel === b.panel;
    }

    public isEqual(b: PartialPanelContent): boolean {
        return PanelContent.isEqual(this, b);
    }

    public isPanelEqual(b: PartialPanelContent): boolean {
        return PanelContent.isPanelEqual(this, b);
    }
}
