import { FormsModule } from '@angular/forms';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { NgxTimePickerComponent } from '@hug/ngx-time-picker';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

const meta: Meta<NgxTimePickerComponent> = {
    title: 'Components/Time Picker',
    component: NgxTimePickerComponent,
    decorators: [
        moduleMetadata({
            imports: [
                FormsModule
            ]
        })
    ],
    tags: ['autodocs'],
    argTypes: {
        mode: {
            options: ['fullTime', 'fullTimeWithHoursDisabled', 'fullTimeWithMinutesDisabled', 'hoursOnly', 'minutesOnly'],
            control: { type: 'select' },
            description: 'Display mode of the time picker.',
            table: {
                defaultValue: { summary: 'fullTime' },
                type: { summary: 'NgxTimePickerDisplayMode' }
            }
        },
        layout: {
            options: ['vertical', 'horizontal', 'horizontal-inlay'],
            control: { type: 'select' },
            description: 'Layout of numeric steppers.',
            table: {
                defaultValue: { summary: 'vertical' },
                type: { summary: 'NgxNumericStepperLayout' }
            }
        },
        appearance: {
            options: ['outline', 'fill'],
            control: { type: 'inline-radio' },
            description: 'Material form field appearance.',
            table: {
                defaultValue: { summary: 'outline' },
                type: { summary: 'MatFormFieldAppearance' }
            }
        },
        step: {
            control: { type: 'number' },
            description: 'Step used when incrementing/decrementing minutes.',
            table: {
                defaultValue: { summary: '1' },
                type: { summary: 'number' }
            }
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Disables both fields and steppers.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        autoFocus: {
            control: { type: 'boolean' },
            description: 'Automatically moves focus to minutes after two valid hour digits.',
            table: {
                defaultValue: { summary: 'true' },
                type: { summary: 'boolean' }
            }
        },
        forceNullValue: {
            control: { type: 'boolean' },
            description: 'Forces value display to null on active field when the other one is disabled and control is pristine.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        defaultPlaceholderHours: {
            control: { type: 'text' },
            description: 'Placeholder used in the hours input.',
            table: {
                defaultValue: { summary: '_ _' },
                type: { summary: 'string' }
            }
        },
        defaultPlaceholderMinutes: {
            control: { type: 'text' },
            description: 'Placeholder used in the minutes input.',
            table: {
                defaultValue: { summary: '_ _' },
                type: { summary: 'string' }
            }
        },
        time: {
            control: false,
            description: 'Current date value bound to the component.',
            table: {
                defaultValue: { summary: undefined },
                type: { summary: 'Date | undefined' }
            }
        },
        timeChange: {
            control: false,
            table: {
                type: { summary: 'EventEmitter<Date>' }
            }
        }
    },
    args: {
        mode: 'fullTime',
        layout: 'vertical',
        appearance: 'outline',
        step: 1,
        disabled: false,
        autoFocus: true,
        forceNullValue: false,
        defaultPlaceholderHours: '_ _',
        defaultPlaceholderMinutes: '_ _'
    },
    parameters: {
        docs: {
            description: {
                component: 'The `NgxTimePickerComponent` provides hour and minute fields with integrated `NgxNumericStepper` controls. It supports several display modes, step customization and Material appearances.'
            }
        }
    }
};

export default meta;
type Story = StoryObj<NgxTimePickerComponent>;

export const standard: Story = {
    render: args => ({
        props: {
            ...args,
            time: new Date(2026, 2, 9, 14, 30)
        },
        template: `
            <section>
                <ngx-time-picker
                    [mode]="mode"
                    [layout]="layout"
                    [appearance]="appearance"
                    [step]="step"
                    [disabled]="disabled"
                    [autoFocus]="autoFocus"
                    [forceNullValue]="forceNullValue"
                    [defaultPlaceholderHours]="defaultPlaceholderHours"
                    [defaultPlaceholderMinutes]="defaultPlaceholderMinutes"
                    [time]="time">
                </ngx-time-picker>
            </section>
        `,
        styles: [`
            section {
                background-color: white;
                padding: 1rem;
            }
        `]
    })
};

export const modes: Story = {
    parameters: {
        docs: {
            description: {
                story: 'This story showcases all supported display modes.'
            }
        }
    },
    render: args => ({
        props: {
            ...args,
            time: new Date(2026, 2, 9, 14, 30)
        },
        template: `
            <section class="grouped">
                <div class="item">
                    <h4>fullTime</h4>
                    <ngx-time-picker [time]="time" mode="fullTime"></ngx-time-picker>
                </div>
                <div class="item">
                    <h4>fullTimeWithHoursDisabled</h4>
                    <ngx-time-picker [time]="time" mode="fullTimeWithHoursDisabled"></ngx-time-picker>
                </div>
                <div class="item">
                    <h4>fullTimeWithMinutesDisabled</h4>
                    <ngx-time-picker [time]="time" mode="fullTimeWithMinutesDisabled"></ngx-time-picker>
                </div>
                <div class="item">
                    <h4>hoursOnly</h4>
                    <ngx-time-picker [time]="time" mode="hoursOnly"></ngx-time-picker>
                </div>
                <div class="item">
                    <h4>minutesOnly</h4>
                    <ngx-time-picker [time]="time" mode="minutesOnly"></ngx-time-picker>
                </div>
            </section>
        `,
        styles: [`
            section {
                background-color: white;
                padding: 1rem;
            }
            .grouped {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                gap: 1rem;
            }
            .item h4 {
                margin: 0 0 0.5rem;
                font-size: 0.85rem;
            }
        `]
    })
};

export const layouts: Story = {
    parameters: {
        docs: {
            description: {
                story: 'This story compares supported stepper layouts.'
            }
        }
    },
    render: args => ({
        props: {
            ...args,
            time: new Date(2026, 2, 9, 9, 45)
        },
        template: `
            <section class="grouped">
                <div class="item">
                    <h4>vertical</h4>
                    <ngx-time-picker [time]="time" layout="vertical"></ngx-time-picker>
                </div>
                <div class="item">
                    <h4>horizontal</h4>
                    <ngx-time-picker [time]="time" layout="horizontal"></ngx-time-picker>
                </div>
                <div class="item">
                    <h4>horizontal-inlay</h4>
                    <ngx-time-picker [time]="time" layout="horizontal-inlay"></ngx-time-picker>
                </div>
            </section>
        `,
        styles: [`
            section {
                background-color: white;
                padding: 1rem;
            }
            .grouped {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                gap: 1rem;
            }
            .item h4 {
                margin: 0 0 0.5rem;
                font-size: 0.85rem;
            }
        `]
    })
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
    render: args => ({
        props: {
            ...args,
            time: new Date(2026, 2, 9, 10, 15),
            currentAppearance: 'outline',
            appearanceChanged(value: 'outline' | 'fill'): void {
                this['currentAppearance'] = value;
            }
        },
        template: `
            <section>
                <ngx-time-picker
                    [time]="time"
                    [appearance]="currentAppearance"
                    [layout]="layout"
                    [mode]="mode">
                </ngx-time-picker>

                <div class="controls">
                    <mat-button-toggle-group
                        name="appearance"
                        [value]="currentAppearance"
                        (change)="appearanceChanged($event.value)">
                        <mat-button-toggle value="outline">Outline</mat-button-toggle>
                        <mat-button-toggle value="fill">Fill</mat-button-toggle>
                    </mat-button-toggle-group>
                </div>
            </section>
        `,
        styles: [`
            section {
                background-color: white;
                padding: 1rem;
            }
            .controls {
                margin-top: 1rem;
                display: flex;
                justify-content: center;
            }
        `]
    })
};

export const withStepAndState: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates minute stepping, disabled state and custom placeholders.'
            }
        }
    },
    render: args => ({
        props: {
            ...args,
            time: new Date(2026, 2, 9, 8, 0),
            disabled: false,
            step: 5,
            defaultPlaceholderHours: 'hh',
            defaultPlaceholderMinutes: 'mm',
            toggleDisabled(): void {
                this['disabled'] = !this['disabled'];
            }
        },
        template: `
            <section>
                <ngx-time-picker
                    [time]="time"
                    [step]="step"
                    [disabled]="disabled"
                    [defaultPlaceholderHours]="defaultPlaceholderHours"
                    [defaultPlaceholderMinutes]="defaultPlaceholderMinutes">
                </ngx-time-picker>

                <div class="controls">
                    <button type="button" (click)="toggleDisabled()">
                        {{ disabled ? 'Enable' : 'Disable' }}
                    </button>
                </div>
            </section>
        `,
        styles: [`
            section {
                background-color: white;
                padding: 1rem;
            }
            .controls {
                margin-top: 1rem;
                display: flex;
                justify-content: center;
            }
            button {
                border: 1px solid #d0d0d0;
                background: white;
                border-radius: 4px;
                padding: 0.5rem 0.75rem;
                cursor: pointer;
            }
        `]
    })
};
