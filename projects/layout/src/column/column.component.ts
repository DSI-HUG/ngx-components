import { ChangeDetectionStrategy, Component, input } from '@angular/core';

type ContentPadding = 'none' | 'default';

@Component({
    selector: 'ngx-column',
    templateUrl: './column.component.html',
    styleUrl: './column.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxColumnComponent {
    public readonly contentPadding = input<ContentPadding | undefined>(undefined);
}
