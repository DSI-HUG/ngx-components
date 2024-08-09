import { type Meta, type StoryObj } from '@storybook/angular';

import { StorybookNumericStepperComponent } from './numeric-stepper.component';

const meta: Meta<StorybookNumericStepperComponent> = {
    title: 'Numeric Stepper',
    component: StorybookNumericStepperComponent,
    tags: ['autodocs'],
    parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen'
    }
};

export default meta;
type Story = StoryObj<StorybookNumericStepperComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const standard: Story = {
    argTypes: {
        value: {
            table: {
                type: { summary: 'number' }
            }
        },
        increment: {
            table: {
                type: { summary: 'number' }
            },
            description: 'Numeric stepper increment value'
        },
        decrement: {
            table: {
                type: { summary: 'number' }
            },
            description: 'Numeric stepper decrement value'
        },
        appearance: {
            options: ['outline', 'fill'],
            control: { type: 'radio' },
            table: {
                defaultValue: {
                    summary: 'outline'
                },
                type: { summary: 'outline | fill' }

            },
            description: 'Possible appearance styles for the form field.'
        },
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
        value: 115,
        increment: 5,
        decrement: 5,
        appearance: 'outline',
        layout: 'vertical'
    }
};

export const horizontalLayout: Story = {
    args: {
        value: 115,
        layout: 'horizontal'
    }
};

export const horizontalInlayLayout: Story = {
    args: {
        value: 115,
        layout: 'horizontal-inlay'
    }
};

export const appearanceFill: Story = {
    args: {
        value: 115,
        appearance: 'fill'
    }
};

export const withPreffix: Story = {
    args: {
        value: 115,
        preffix: 'my_preffix'
    }
};

export const withSuffix: Story = {
    args: {
        value: 115,
        suffix: 'cm'
    }
};

export const withPrefixAndSuffix: Story = {
    args: {
        value: 115,
        preffix: 'Nous avons',
        suffix: 'cm'
    }
};
