import { PanelContent } from './panel.content';
import { PanelOptions } from './panel.options';

export class PanelContentGroup {
    public panelContent: PanelContent[] = [];

    public constructor(
        public id: number,
        public options: PanelOptions
    ) {
    }
}
