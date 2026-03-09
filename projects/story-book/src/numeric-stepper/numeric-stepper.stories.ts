import { FormsModule } from '@angular/forms';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { NgxNumericStepperComponent } from '../../../numeric-stepper/src/numeric-stepper.component';

const baseStyles = `
    section {
        background-color: white;
        padding: 1rem;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1rem;
    }

    .item h4 {
        margin: 0 0 0.5rem;
        font-size: 0.85rem;
    }

    .controls {
        margin-top: 1rem;
        display: flex;
        justify-content: center;
    }
`;

const meta: Meta<NgxNumericStepperComponent> = {
    title: 'Components/Numeric Stepper',
    component: NgxNumericStepperComponent,
    decorators: [
        moduleMetadata({
            imports: [
                MatLabel,
                MatInput,
                MatPrefix,
                MatSuffix,
                MatFormField,
                FormsModule
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
                defaultValue: { summary: 'vertical' },
                type: { summary: 'NgxNumericStepperLayout' }
            }
        },
        arrowIcons: {
            control: { type: 'boolean' },
            description: 'Whether to display arrow icons.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        showOnInit: {
            control: { type: 'boolean' },
            description: 'Whether to display controls before hover.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        increment: { control: false },
        decrement: { control: false },
        input: { control: false }
    },
    args: {
        layout: 'vertical',
        arrowIcons: false,
        showOnInit: false
    },
    parameters: {
        docs: {
            description: {
                component: 'The `NgxNumericStepperComponent` adds increment and decrement controls to an input inside a `mat-form-field`.'
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
                        <mat-label>Weight</mat-label>
                        <input matInput type="number" [ngModel]="value" />
                        <ngx-numeric-stepper
                            [layout]="layout"
                            [arrowIcons]="arrowIcons"
                            [showOnInit]="showOnInit"
                            (increment)="value = value + 5"
                            (decrement)="value = value - 5">
                        </ngx-numeric-stepper>
                    </mat-form-field>
                </div>
            </section>
        `,
        styles: [baseStyles]
    })
};

export const layouts: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Compare all supported layouts: `vertical`, `horizontal`, and `horizontal-inlay`.'
            }
        }
    },
    render: () => ({
        props: {
            value: 115
        },
        template: `
            <section class="grid">
                <div class="item" ngx-numeric-stepper-container>
                    <h4>vertical</h4>
                    <mat-form-field appearance="outline">
                        <mat-label>Value</mat-label>
                        <input matInput type="number" [ngModel]="value" />
                        <ngx-numeric-stepper layout="vertical" (increment)="value = value + 1" (decrement)="value = value - 1" showOnInit></ngx-numeric-stepper>
                    </mat-form-field>
                </div>

                <div class="item" ngx-numeric-stepper-container>
                    <h4>horizontal</h4>
                    <mat-form-field appearance="outline">
                        <mat-label>Value</mat-label>
                        <input matInput type="number" [ngModel]="value" />
                        <ngx-numeric-stepper layout="horizontal" (increment)="value = value + 1" (decrement)="value = value - 1" showOnInit></ngx-numeric-stepper>
                    </mat-form-field>
                </div>

                <div class="item" ngx-numeric-stepper-container>
                    <h4>horizontal-inlay</h4>
                    <mat-form-field appearance="outline">
                        <mat-label>Value</mat-label>
                        <input matInput type="number" [ngModel]="value" />
                        <ngx-numeric-stepper layout="horizontal-inlay" (increment)="value = value + 1" (decrement)="value = value - 1" showOnInit></ngx-numeric-stepper>
                    </mat-form-field>
                </div>
            </section>
        `,
        styles: [baseStyles]
    })
};

export const appearance: Story = {
    decorators: [
        moduleMetadata({
            imports: [MatButtonToggle, MatButtonToggleGroup]
        })
    ],
    render: args => ({
        props: {
            ...args,
            value: 115,
            currentAppearance: 'outline',
            setAppearance(value: 'outline' | 'fill'): void {
                this['currentAppearance'] = value;
            }
        },
        template: `
            <section>
                <div ngx-numeric-stepper-container>
                    <mat-form-field [appearance]="currentAppearance">
                        <mat-label>Value</mat-label>
                        <input matInput type="number" [ngModel]="value" />
                        <ngx-numeric-stepper
                            [layout]="layout"
                            [arrowIcons]="arrowIcons"
                            [showOnInit]="true"
                            (increment)="value = value + 5"
                            (decrement)="value = value - 5">
                        </ngx-numeric-stepper>
                    </mat-form-field>
                </div>

                <div class="controls">
                    <mat-button-toggle-group [value]="currentAppearance" (change)="setAppearance($event.value)">
                        <mat-button-toggle value="outline">Outline</mat-button-toggle>
                        <mat-button-toggle value="fill">Fill</mat-button-toggle>
                    </mat-button-toggle-group>
                </div>
            </section>
        `,
        styles: [baseStyles]
    })
};

export const prefixAndSuffix: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use text prefix and suffix while keeping stepper controls.'
            }
        }
    },
    render: () => ({
        props: {
            value: 115,
            prefix: '',
            suffix: 'cm',
            setPrefix(value: string): void {
                this['prefix'] = value;
            },
            setSuffix(value: string): void {
                this['suffix'] = value;
            }
        },
        template: `
            <section>
                <div class="grid">
                    <div class="item" ngx-numeric-stepper-container>
                        <h4>Preview</h4>
                        <mat-form-field appearance="outline">
                            <mat-label>Value</mat-label>
                            @if(prefix) {
                                <span matTextPrefix>{{ prefix }}</span>
                            }
                            <input matInput type="number" [ngModel]="value" />
                            @if(suffix) {
                                <span matTextSuffix>{{ suffix }}</span>
                            }
                            <ngx-numeric-stepper layout="horizontal-inlay" (increment)="value = value + 5" (decrement)="value = value - 5" showOnInit></ngx-numeric-stepper>
                        </mat-form-field>
                    </div>

                    <div class="item">
                        <h4>Configure</h4>
                        <mat-form-field appearance="outline">
                            <mat-label>Prefix</mat-label>
                            <input matInput [ngModel]="prefix" (ngModelChange)="setPrefix($event)" />
                        </mat-form-field>
                        <mat-form-field appearance="outline">
                            <mat-label>Suffix</mat-label>
                            <input matInput [ngModel]="suffix" (ngModelChange)="setSuffix($event)" />
                        </mat-form-field>
                    </div>
                </div>
            </section>
        `,
        styles: [baseStyles]
    })
};
