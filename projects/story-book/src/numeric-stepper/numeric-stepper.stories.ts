import { FormsModule } from '@angular/forms';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { NgxNumericStepperComponent } from '../../../numeric-stepper/m2/numeric-stepper.component';

const meta: Meta<NgxNumericStepperComponent> = {
    title: 'Components/Numeric Stepper',
    component: NgxNumericStepperComponent,
    decorators: [
        moduleMetadata({
            imports: [
                MatLabel, MatInput, MatPrefix, MatSuffix, MatFormField, FormsModule
            ]
        })
    ],
    tags: ['autodocs'],
    argTypes: {
        layout: {
            options: ['vertical', 'horizontal', 'horizontal-inlay'],
            control: { type: 'select' },
            description: 'Layout of the stepper control.',
            table: {
                defaultValue: {
                    summary: 'vertical'
                },
                type: { summary: 'NgxNumericStepperLayout' }
            }
        },
        arrowIcons: {
            control: { type: 'boolean' },
            description: 'Whether to show arrow icons.',
            table: {
                defaultValue: {
                    summary: 'false'
                },
                type: { summary: 'boolean' }
            }
        },
        showOnInit: {
            control: { type: 'boolean' },
            description: 'Whether to show the stepper on initialization.',
            table: {
                defaultValue: {
                    summary: 'false'
                },
                type: { summary: 'boolean' }
            }
        },
        input: {
            control: { type: 'object' },
            description: 'The form field control input to be used.',
            table: {
                defaultValue: { summary: undefined },
                type: { summary: 'MatFormFieldControl<unknown>' }
            }
        }
    },
    args: {
        layout: 'vertical'
    },
    parameters: {
        docs: {
            description: {
                component: 'The `NgxNumericStepperComponent` integrates with a `mat-form-field` containing an input. It provides a hover mask to allow custom increments or decrements using the `+` and `-` buttons. It can be configured with various layouts and options.'
            }
        }
    }
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
                        <ngx-numeric-stepper (increment)="value = value + 5" (decrement)="value = value - 5" [layout]="layout" [arrowIcons]="arrowIcons" [showOnInit]="showOnInit" [input]="input" showOnInit></ngx-numeric-stepper>
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
                story: 'This component supports several layouts: <ul><li><code>vertical</code></li><li><code>horizontal</code></li><li><code>horizontal-inlay</code></li></ul>'
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

export const customArrowIcons: Story = {
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
                <mat-label>Custom Arrow Icons</mat-label>
                        <input matInput type="number" [ngModel]="value" #numericStepper="ngModel" />
                        <ngx-numeric-stepper (increment)="value = value + 5" (decrement)="value = value - 5" [layout]="layout" [arrowIcons]="arrowIcons" [showOnInit]="showOnInit" [input]="input" showOnInit></ngx-numeric-stepper>
                    </mat-form-field>
                </div>
            </section>
          `,
        styles: [`
            section {
                background-color: white;
            }
          `]
    }),
    args: {
        arrowIcons: true
    }
};

export const showOnInit: Story = {
    tags: ['!dev', '!autodocs'], // Pour disable sur le menu à gauche !dev, et sur la doc !autodocs
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
                <mat-label>Show On Init True</mat-label>
                        <input matInput type="number" [ngModel]="value" #numericStepper="ngModel" />
                        <ngx-numeric-stepper (increment)="value = value + 5" (decrement)="value = value - 5" [layout]="layout" [arrowIcons]="arrowIcons" [showOnInit]="showOnInit" [input]="input" showOnInit></ngx-numeric-stepper>
                    </mat-form-field>
                </div>
            </section>
          `,
        styles: [`
            section {
                background-color: white;
            }
          `]
    }),
    args: {
        showOnInit: true
    }
};

export const appearance: Story = {
    decorators: [
        moduleMetadata({
            imports: [
                MatButtonToggle,
                MatButtonToggleGroup
            ]
        })
    ],
    parameters: {
        docs: {
            description: {
                story: 'This component supports different appearances for `mat-form-field`.'
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
                    <mat-button-toggle-group name="appearance" (change)="appearanceChanged($event.value)" [value]="appearance">
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
                story: 'This section allows you to visualize the component with different `mat-form-field` configurations, including custom prefixes and suffixes.'
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
                            @if(prefix) {
                                <span matTextPrefix>{{ prefix }}</span>
                            }
                            <input matInput type="number" [ngModel]="value" #numericStepper="ngModel" />
                            @if(suffix) {
                                <span matTextSuffix>{{ suffix }}</span>
                            }
                            <ngx-numeric-stepper (increment)="value = value + 5" (decrement)="value = value - 5" layout="vertical" showOnInit></ngx-numeric-stepper>
                        </mat-form-field>
                    </div>
                     <div ngx-numeric-stepper-container>
                        <mat-form-field appearance="fill">
                            <mat-label>vertical layout</mat-label>
                            @if(prefix) {
                                <span matTextPrefix>{{ prefix }}</span>
                            }
                            <input matInput type="number" [ngModel]="value" #numericStepper="ngModel" />
                            @if(suffix) {
                                <span matTextSuffix>{{ suffix }}</span>
                            }
                            <ngx-numeric-stepper (increment)="value = value + 5" (decrement)="value = value - 5" layout="vertical" showOnInit></ngx-numeric-stepper>
                        </mat-form-field>
                    </div>
                </div>
                <br />
                <div class="grouped">
                    <div ngx-numeric-stepper-container>
                        <mat-form-field appearance="outline">
                            <mat-label>horizontal layout</mat-label>
                            @if(prefix) {
                                <span matTextPrefix>{{ prefix }}</span>
                            }
                            <input matInput type="number" [ngModel]="value" #numericStepper="ngModel" />
                            @if(suffix) {
                                <span matTextSuffix>{{ suffix }}</span>
                            }
                            <ngx-numeric-stepper (increment)="value = value + 5" (decrement)="value = value - 5" layout="horizontal" showOnInit></ngx-numeric-stepper>
                        </mat-form-field>
                    </div>
                    <div ngx-numeric-stepper-container>
                        <mat-form-field appearance="fill">
                            <mat-label>horizontal layout</mat-label>
                            @if(prefix) {
                                <span matTextPrefix>{{ prefix }}</span>
                            }
                            <input matInput type="number" [ngModel]="value" #numericStepper="ngModel" />
                            @if(suffix) {
                                <span matTextSuffix>{{ suffix }}</span>
                            }
                            <ngx-numeric-stepper (increment)="value = value + 5" (decrement)="value = value - 5" layout="horizontal" showOnInit></ngx-numeric-stepper>
                        </mat-form-field>
                    </div>
                </div>
                <br />
                <div class="grouped">
                    <div ngx-numeric-stepper-container>
                        <mat-form-field appearance="outline">
                            <mat-label>horizontal-inlay layout</mat-label>
                            @if(prefix) {
                                <span matTextPrefix>{{ prefix }}</span>
                            }
                            <input matInput type="number" [ngModel]="value" #numericStepper="ngModel" />
                            @if(suffix) {
                                <span matTextSuffix>{{ suffix }}</span>
                            }
                            <ngx-numeric-stepper (increment)="value = value + 5" (decrement)="value = value - 5" layout="horizontal-inlay" showOnInit></ngx-numeric-stepper>
                        </mat-form-field>
                    </div>
                    <div ngx-numeric-stepper-container>
                        <mat-form-field appearance="fill">
                            <mat-label>horizontal-inlay layout</mat-label>
                            @if(prefix) {
                                <span matTextPrefix>{{ prefix }}</span>
                            }
                            <input matInput type="number" [ngModel]="value" #numericStepper="ngModel" />
                            @if(suffix) {
                                <span matTextSuffix>{{ suffix }}</span>
                            }
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
