import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxNumericStepperComponent } from '@hug/ngx-numeric-stepper';

import { NgxUserCardComponent } from '../user-card.component';
import { NgxUserCard } from '../user-card.model';

@Component({
    selector: 'storybook-user-card',
    templateUrl: './user-card.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule,
        NgxUserCardComponent,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        NgxNumericStepperComponent,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule],
    styleUrls: ['./user-card.scss']
})
export class StorybookUserCardComponent {
    /**
   * Is this the principal call to action on the page?
   */
    @Input()
    public user!: NgxUserCard;

    @Input()
    public expanded = false;

}
