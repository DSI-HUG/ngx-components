import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
    selector: 'ngx-nav-button',
    imports: [MatTooltip],
    templateUrl: './nav-button.component.html',
    styleUrl: './nav-button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    /* eslint-disable @typescript-eslint/naming-convention */
    host: {
        '[class.active]': 'active()'
    }
    /* eslint-enable @typescript-eslint/naming-convention */
})
export class NavButtonComponent {
    public active = input<boolean>(false);
}
