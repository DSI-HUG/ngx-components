import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'ngx-nav-action',
    imports: [MatIcon, MatIconButton],
    templateUrl: './nav-action.component.html',
    styleUrl: './nav-action.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    /* eslint-disable @typescript-eslint/naming-convention */
    host: {
        '[class.active]': 'active()',
        '[class.outline]': 'outline()'
    }
    /* eslint-enable @typescript-eslint/naming-convention */
})
export class NavActionComponent {
    public active = input<boolean>(false);
    public outline = input<boolean>(false);
}
