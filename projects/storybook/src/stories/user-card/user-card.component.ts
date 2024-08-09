import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { NgxUserCardComponent } from '../../../../user-card/src/user-card.component';
import type { NgxUserCard } from '../../../../user-card/src/user-card.model';


@Component({
    selector: 'storybook-user-card',
    templateUrl: './user-card.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule, NgxUserCardComponent],
    styleUrls: ['./user-card.scss']
})
export class StorybookUserCardComponent {

    @Input()
    public user!: NgxUserCard;

    @Input()
    public expanded = true;
}
