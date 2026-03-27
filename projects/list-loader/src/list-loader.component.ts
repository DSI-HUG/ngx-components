import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'ngx-list-loader',
    templateUrl: './list-loader.component.html',
    styleUrl: './list-loader.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxListLoaderComponent {

    public readonly label = input<string>();

}
