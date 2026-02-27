import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
    selector: 'ngx-layout',
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxLayoutComponent {
}
