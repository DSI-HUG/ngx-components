import { Component, input } from '@angular/core';


@Component({
    selector: 'ngx-side-nav',
    imports: [],
    templateUrl: './side-nav.component.html',
    styleUrl: './side-nav.component.scss',

    host: {
        '[class.divider]': 'withDivider()'
    }

})
export class NgxSideNavComponent {
    public withDivider = input<boolean>(false);
}
