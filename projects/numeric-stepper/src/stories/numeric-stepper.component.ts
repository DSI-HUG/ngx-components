import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { type MatFormFieldAppearance, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { NgxNumericStepperComponent, type NgxNumericStepperLayout } from '../numeric-stepper.component';

@Component({
    selector: 'storybook-numeric-stepper',
    templateUrl: './numeric-stepper.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, NgxNumericStepperComponent, MatFormFieldModule, FormsModule, MatInputModule, ReactiveFormsModule],
    styleUrls: ['./numeric-stepper.scss']
})
export class StorybookNumericStepperComponent {

    @Input()
    public value!: number;

    @Input()
    public label = 'This is my label';

    @Input()
    public preffix: string | undefined = undefined;

    @Input()
    public suffix: string | undefined = undefined;

    @Input()
    public appearance: MatFormFieldAppearance = 'outline';

    @Input()
    public increment!: number;

    @Input()
    public decrement!: number;

    @Input()
    public layout!: NgxNumericStepperLayout;

    @Input()
    public arrowIcons!: boolean;

    @Input()
    public showOnInit!: boolean;
}
