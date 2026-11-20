import { Component, Input } from '@angular/core';

@Component({
    selector: 'ngx-list-loader',
    templateUrl: './list-loader.component.html',
    styleUrls: ['./list-loader.component.scss'],
    standalone: true,
})
export class NgxListLoaderComponent {
    @Input()
    public label?: string;
}
