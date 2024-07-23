import { DecimalPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDestroy } from '@hug/ngx-core';
import { NumericStepperComponent } from '@hug/ngx-numeric-stepper';
import { Subject, debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs';

interface NumberFormControls {
    numberValue3: FormControl<number>;
    numberValue4: FormControl<number>;
    numberValue5: FormControl<number>;
    numberValue6: FormControl<number>;
}

const numberValidator = (control: AbstractControl): string[] | null => {
    const val = +control.value;
    if (isNaN(val)) {
        return ['Not a number'];
    } else if (val < 0) {
        return [`Expected positive number. Got ${val}`];
    }
    return null;
};

@Component({
    selector: 'app-numeric-stepper-demo',
    styleUrls: ['./numeric-stepper-demo.component.scss'],
    templateUrl: './numeric-stepper-demo.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatTabsModule,
        MatToolbarModule,
        NumericStepperComponent,
        NgIf,
        DecimalPipe
    ]
})
export class NumericStepperDemoComponent extends NgxDestroy {
    protected tabIndex = 1;

    protected value1 = 90;
    protected value2 = 9.5;
    protected value3 = 5;
    protected value4 = 1;
    protected value5 = 1;
    protected value6 = 1;
    protected value6min = 0;
    protected value6max = 20;

    protected numberForm: FormGroup<NumberFormControls>;
    protected onInput1Change$ = new Subject<Event>();

    private changeDetectorRef = inject(ChangeDetectorRef);
    private formBuilder = inject(FormBuilder);

    public constructor() {
        super();

        this.numberForm = this.formBuilder.group({
            numberValue3: this.formBuilder.control({ value: this.value3, disabled: false }, { validators: numberValidator, nonNullable: true }),
            numberValue4: this.formBuilder.control(this.value4, { validators: [Validators.required, numberValidator], nonNullable: true }),
            numberValue5: this.formBuilder.control(this.value5, { validators: numberValidator, nonNullable: true }),
            numberValue6: this.formBuilder.control(this.value6, { validators: numberValidator, nonNullable: true })
        });

        this.onInput1Change$.pipe(
            debounceTime(1),
            distinctUntilChanged(),
            map(event => parseFloat((event.target as HTMLInputElement).value)),
            takeUntil(this.destroyed$)
        ).subscribe(v => {
            this.value1 = v;
            this.changeDetectorRef.markForCheck();
        });
    }

    protected changeValue3(step: number): void {
        this.numberForm.controls.numberValue3.setValue(+this.numberForm.controls.numberValue3.value + step);
    }

    protected changeValue4(step: number): void {
        this.numberForm.controls.numberValue4.setValue(+this.numberForm.controls.numberValue4.value + step);
    }

    protected changeValue5(step: number): void {
        this.numberForm.controls.numberValue5.setValue(+this.numberForm.controls.numberValue5.value + step);
    }

    protected changeValue6(step: number): void {
        const value = Math.max(Math.min(+this.numberForm.controls.numberValue6.value + step, this.value6max), this.value6min);
        this.numberForm.controls.numberValue6.setValue(value);
    }
}
