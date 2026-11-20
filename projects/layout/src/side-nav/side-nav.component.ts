import { ChangeDetectionStrategy, Component, input } from '@angular/core';


@Component({
    selector: 'ngx-side-nav',
    imports: [],
    templateUrl: './side-nav.component.html',
    styleUrl: './side-nav.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    /* eslint-disable @typescript-eslint/naming-convention */
    host: {
        '[class.divider]': 'withDivider()'
    }
    /* eslint-enable @typescript-eslint/naming-convention */
})
export class NgxSideNavComponent {
    public withDivider = input<boolean>(false);
}
