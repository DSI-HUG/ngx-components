import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { NgxListLoaderComponent } from '../../../../list-loader/src/list-loader.component';


@Component({
    selector: 'storybook-NgxListLoaderComponent',
    templateUrl: './list-loader.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule, NgxListLoaderComponent],
    styleUrls: ['./list-loader.scss']
})
export class StorybookListLoaderComponent {
    @Input()
    public label = '';
}
