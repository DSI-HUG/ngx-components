import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'ngx-list-loader',
    templateUrl: './list-loader.component.html',
    styleUrls: ['./list-loader.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class NgxListLoaderComponent {
    @Input()
    public label?: string;
}
