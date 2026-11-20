import { Component, input, ViewEncapsulation } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'ngx-nav-action',
    imports: [MatIcon, MatIconButton],
    templateUrl: './nav-action.component.html',
    styleUrl: './nav-action.component.scss',
    encapsulation: ViewEncapsulation.None,

    host: {
        '[class.active]': 'active()',
        '[class.outline]': 'outline()',
    },

})
export class NgxNavActionComponent {
    public active = input<boolean>(false);
    public outline = input<boolean>(false);
}
