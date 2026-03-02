import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

type Appearance = 'transparent' | 'default';
type ContentPadding = 'none' | 'regular';

@Component({
    selector: 'ngx-panel',
    templateUrl: './panel.component.html',
    styleUrl: './panel.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        '[attr.appearance]': 'this.appearance()',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        '[attr.content-padding]': 'this.contentPadding()'
    }
})
export class NgxPanelComponent {
    public readonly appearance = input<Appearance | undefined>(undefined);
    public readonly contentPadding = input<ContentPadding | undefined>(undefined, { alias: 'content-padding' });
}
