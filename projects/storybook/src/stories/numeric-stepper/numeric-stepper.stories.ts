import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { NgxNumericStepperComponent } from '../../../../numeric-stepper/src/numeric-stepper.component';

const meta: Meta<NgxNumericStepperComponent> = {
    title: 'Components/Numeric Stepper',
    component: NgxNumericStepperComponent,
    decorators: [
        moduleMetadata({
            imports: [
                CommonModule, NgxNumericStepperComponent, MatFormFieldModule, FormsModule, MatInputModule, ReactiveFormsModule, MatButtonToggleModule, BrowserAnimationsModule
            ]
        })
    ],
    tags: ['autodocs'],
    argTypes: {
        layout: {
            options: ['vertical', 'horizontal', 'horizontal-inlay'],
            control: { type: 'radio' },
            table: {
                defaultValue: {
                    summary: 'vertical'
                },
                type: { summary: 'vertical | horizontal | horizontal-inlay' }
            }
        }
    },
    args: {
        layout: 'vertical'
    },
    parameters: {
        docs: {
            description: {
                component: 'This component works with a mat-form-field containing an input.<br/>It adds a mask on hover to allow custom additions or subtractions to be made using the + and - buttons'
            }
        }
    },
};
export default meta;
type Story = StoryObj<NgxNumericStepperComponent>;

export const standard: Story = {
    render: args => ({
        props: {
            ...args,
            value: 115,
            appearance: 'outline'
        },
        template: `
            <section>
                <div ngx-numeric-stepper-container>
                    <mat-form-field [appearance]="appearance">
                        <mat-label>This is my label</mat-label>
                        <input matInput type="number" [ngModel]="value" #numericStepper="ngModel" />
                        <ngx-numeric-stepper (increment)="value = value + 5" (decrement)="value = value - 5" [layout]="layout" showOnInit></ngx-numeric-stepper>
                    </mat-form-field>
                </div>
            </section>
          `,
        styles: [`
            section {
                background-color: white;
            }
          `]
    })
};

export const layout: Story = {
    parameters: {
        docs: {
            description: {
                story: 'This component offers the possibility of using several layouts: <ul><li><code>vertical</code></li><li><code>horizontal</code></li><li><code>horizontal-inlay</code></li></ul>'
            }
        }
    },
    render: args => ({
        props: {
            ...args,
            value: 115
        },
        template: `
            <section>
                <div class="grouped">
                    <div ngx-numeric-stepper-container>
                        <mat-form-field appearance="outline">
                            <mat-label>vertical layout</mat-label>
                            <input matInput type="number" [ngModel]="value" #numericStepper="ngModel" />
                            <ngx-numeric-stepper (increment)="value = value + 5" (decrement)="value = value - 5" layout="vertical" showOnInit></ngx-numeric-stepper>
                        </mat-form-field>
                    </div>
                     <div ngx-numeric-stepper-container>
                        <mat-form-field appearance="fill">
                            <mat-label>vertical layout</mat-label>
                            <input matInput type="number" [ngModel]="value" #numericStepper="ngModel" />
                            <ngx-numeric-stepper (increment)="value = value + 5" (decrement)="value = value - 5" layout="vertical" showOnInit></ngx-numeric-stepper>
                        </mat-form-field>
                    </div>
                </div>
                <br />
                <div class="grouped">
                    <div ngx-numeric-stepper-container>
                        <mat-form-field appearance="outline">
                            <mat-label>horizontal layout</mat-label>
                            <input matInput type="number" [ngModel]="value" #numericStepper="ngModel" />
                            <ngx-numeric-stepper (increment)="value = value + 5" (decrement)="value = value - 5" layout="horizontal" showOnInit></ngx-numeric-stepper>
                        </mat-form-field>
                    </div>
                    <div ngx-numeric-stepper-container>
                        <mat-form-field appearance="fill">
                            <mat-label>horizontal layout</mat-label>
                            <input matInput type="number" [ngModel]="value" #numericStepper="ngModel" />
                            <ngx-numeric-stepper (increment)="value = value + 5" (decrement)="value = value - 5" layout="horizontal" showOnInit></ngx-numeric-stepper>
                        </mat-form-field>
                    </div>
                </div>
                <br />
                <div class="grouped">
                    <div ngx-numeric-stepper-container>
                        <mat-form-field appearance="outline">
                            <mat-label>horizontal-inlay layout</mat-label>
                            <input matInput type="number" [ngModel]="value" #numericStepper="ngModel" />
                            <ngx-numeric-stepper (increment)="value = value + 5" (decrement)="value = value - 5" layout="horizontal-inlay" showOnInit></ngx-numeric-stepper>
                        </mat-form-field>
                    </div>
                    <div ngx-numeric-stepper-container>
                        <mat-form-field appearance="fill">
                            <mat-label>horizontal-inlay layout</mat-label>
                            <input matInput type="number" [ngModel]="value" #numericStepper="ngModel" />
                            <ngx-numeric-stepper (increment)="value = value + 5" (decrement)="value = value - 5" layout="horizontal-inlay" showOnInit></ngx-numeric-stepper>
                        </mat-form-field>
                    </div>
                </div>
            </section>
          `,
        styles: [`
            section {
                background-color: white;
            }
            .matButtonContainer {
                padding-top: 20px;
                display: flex;
                justify-content: center;
            }
            .grouped {
                display: flex;
                gap: 5rem;
            }
          `]
    }),
    args: {
        layout: 'vertical'
    }
};

export const appearance: Story = {
    parameters: {
        docs: {
            description: {
                story: 'This component supports the different appearances of mat-form-fields.'
            }
        }
    },
    render: args => ({
        props: {
            ...args,
            value: 115,
            appearance: 'fill',
            appearanceChanged(value: string): void {
                this['appearance'] = value;
            }
        },
        template: `
            <section>
                <div ngx-numeric-stepper-container>
                    <mat-form-field [appearance]="appearance">
                        <mat-label>This is my label</mat-label>
                        <input matInput type="number" [ngModel]="value" #numericStepper="ngModel" />
                        <ngx-numeric-stepper (increment)="value = value + 5" (decrement)="value = value - 5" [layout]="layout" showOnInit></ngx-numeric-stepper>
                    </mat-form-field>
                </div>
                <div class="matButtonContainer">
                    <mat-button-toggle-group name="appearance" hideSingleSelectionIndicator="true" (change)="appearanceChanged($event.value)" [value]="appearance">
                        <mat-button-toggle value="fill">Fill</mat-button-toggle>
                        <mat-button-toggle value="outline">Outline</mat-button-toggle>
                    </mat-button-toggle-group>
                </div>
            </section>
          `,
        styles: [`
            section {
                background-color: white;
            }
            .matButtonContainer {
                padding-top: 20px;
                display: flex;
                justify-content: center;
            }
          `]
    })
};

export const prefixAndSuffix: Story = {
    parameters: {
        docs: {
            description: {
                story: 'It\'s not in the component, but this section allows you to visualize the component with different mat-form-fields.'
            }
        }
    },
    render: args => ({
        props: {
            ...args,
            value: 115,
            prefix: '',
            suffix: 'cm',
            prefixChanged(value: string): void {
                this['prefix'] = value;
            },
            suffixChanged(value: string): void {
                this['suffix'] = value;
            }
        },
        template: `
            <section>
                <div class="grouped">
                    <div ngx-numeric-stepper-container>
                        <mat-form-field appearance="outline">
                            <mat-label>vertical layout</mat-label>
                            <span matTextPrefix="" *ngIf="prefix">{{ prefix }}</span>
                            <input matInput type="number" [ngModel]="value" #numericStepper="ngModel" />
                            <span matTextSuffix *ngIf="suffix">{{ suffix }}</span>
                            <ngx-numeric-stepper (increment)="value = value + 5" (decrement)="value = value - 5" layout="vertical" showOnInit></ngx-numeric-stepper>
                        </mat-form-field>
                    </div>
                     <div ngx-numeric-stepper-container>
                        <mat-form-field appearance="fill">
                            <mat-label>vertical layout</mat-label>
                            <span matTextPrefix="" *ngIf="prefix">{{ prefix }}</span>
                            <input matInput type="number" [ngModel]="value" #numericStepper="ngModel" />
                            <span matTextSuffix *ngIf="suffix">{{ suffix }}</span>
                            <ngx-numeric-stepper (increment)="value = value + 5" (decrement)="value = value - 5" layout="vertical" showOnInit></ngx-numeric-stepper>
                        </mat-form-field>
                    </div>
                </div>
                <br />
                <div class="grouped">
                    <div ngx-numeric-stepper-container>
                        <mat-form-field appearance="outline">
                            <mat-label>horizontal layout</mat-label>
                            <span matTextPrefix="" *ngIf="prefix">{{ prefix }}</span>
                            <input matInput type="number" [ngModel]="value" #numericStepper="ngModel" />
                            <span matTextSuffix *ngIf="suffix">{{ suffix }}</span>
                            <ngx-numeric-stepper (increment)="value = value + 5" (decrement)="value = value - 5" layout="horizontal" showOnInit></ngx-numeric-stepper>
                        </mat-form-field>
                    </div>
                    <div ngx-numeric-stepper-container>
                        <mat-form-field appearance="fill">
                            <mat-label>horizontal layout</mat-label>
                            <span matTextPrefix="" *ngIf="prefix">{{ prefix }}</span>
                            <input matInput type="number" [ngModel]="value" #numericStepper="ngModel" />
                            <span matTextSuffix *ngIf="suffix">{{ suffix }}</span>
                            <ngx-numeric-stepper (increment)="value = value + 5" (decrement)="value = value - 5" layout="horizontal" showOnInit></ngx-numeric-stepper>
                        </mat-form-field>
                    </div>
                </div>
                <br />
                <div class="grouped">
                    <div ngx-numeric-stepper-container>
                        <mat-form-field appearance="outline">
                            <mat-label>horizontal-inlay layout</mat-label>
                            <span matTextPrefix="" *ngIf="prefix">{{ prefix }}</span>
                            <input matInput type="number" [ngModel]="value" #numericStepper="ngModel" />
                            <span matTextSuffix *ngIf="suffix">{{ suffix }}</span>
                            <ngx-numeric-stepper (increment)="value = value + 5" (decrement)="value = value - 5" layout="horizontal-inlay" showOnInit></ngx-numeric-stepper>
                        </mat-form-field>
                    </div>
                    <div ngx-numeric-stepper-container>
                        <mat-form-field appearance="fill">
                            <mat-label>horizontal-inlay layout</mat-label>
                            <span matTextPrefix="" *ngIf="prefix">{{ prefix }}</span>
                            <input matInput type="number" [ngModel]="value" #numericStepper="ngModel" />
                            <span matTextSuffix *ngIf="suffix">{{ suffix }}</span>
                            <ngx-numeric-stepper (increment)="value = value + 5" (decrement)="value = value - 5" layout="horizontal-inlay" showOnInit></ngx-numeric-stepper>
                        </mat-form-field>
                    </div>
                </div>
                <br />
                <h4>Try your own suffixes and prefixes</h4>
                <br />
                <div class="grouped">
                        <mat-form-field appearance="outline">
                            <mat-label>prefix</mat-label>
                            <input matInput type="string" [ngModel]="prefix" (ngModelChange)="prefixChanged($event)" />
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                            <mat-label>suffix</mat-label>
                            <input matInput type="string" [ngModel]="suffix" (ngModelChange)="suffixChanged($event)" />
                        </mat-form-field>
                </div>
            </section>
          `,
        styles: [`
            section {
                background-color: white;
                font-family: 'Roboto';
            }
            .matButtonContainer {
                padding-top: 20px;
                display: flex;
                justify-content: center;
            }
            .grouped {
                display: flex;
                gap: 5rem;
            }
          `]
    }),
    args: {
        layout: 'vertical'
    }
};
