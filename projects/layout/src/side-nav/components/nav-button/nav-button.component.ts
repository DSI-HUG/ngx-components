import { Component, input, ViewEncapsulation } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
    selector: 'ngx-nav-button',
    imports: [MatTooltip],
    templateUrl: './nav-button.component.html',
    styleUrl: './nav-button.component.scss',
    encapsulation: ViewEncapsulation.None,

    host: {
        '[class.active]': 'active()'
    }

})
export class NavButtonComponent {
    public active = input<boolean>(false);
}
