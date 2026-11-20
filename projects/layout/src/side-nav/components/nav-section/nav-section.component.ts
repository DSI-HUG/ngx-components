import { Component, input } from '@angular/core';

@Component({
    selector: 'ngx-nav-section',
    imports: [],
    templateUrl: './nav-section.component.html',
    styleUrl: './nav-section.component.scss',
    /* eslint-disable @typescript-eslint/naming-convention */
    host: {
        '[aria-label]': 'label()'
    }
    /* eslint-enable @typescript-eslint/naming-convention */
})
export class NavSectionComponent {
    public label = input<string>();
}
