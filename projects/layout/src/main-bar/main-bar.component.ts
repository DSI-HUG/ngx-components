import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'ngx-main-bar',
    templateUrl: './main-bar.component.html',
    styleUrl: './main-bar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxMainBarComponent { }
