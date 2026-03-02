import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';


@Component({
    selector: 'ngx-main-bar',
    templateUrl: './main-bar.component.html',
    styleUrl: './main-bar.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxMainBarComponent { }
