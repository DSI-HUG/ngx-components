import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'list-loader',
    templateUrl: './list-loader.component.html',
    styleUrls: ['./list-loader.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        CommonModule
    ]
})
export class ListLoaderComponent {
    @Input()
    public label?: string;
}
