import { type Meta, type StoryObj } from '@storybook/angular';

import { NgxListLoaderComponent } from '../../../../list-loader/src/list-loader.component';


const meta: Meta<NgxListLoaderComponent> = {
    title: 'Components/List Loader',
    component: NgxListLoaderComponent,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'This component is a loader. Useful to display if you need to load large data behind.'
            }
        }
    }
};

export default meta;
type Story = StoryObj<NgxListLoaderComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const standard: Story = {
    argTypes: {
        label: {
            table: {
                type: { summary: 'string' }
            }
        }
    },
    args: {
        label: ''
    }
};

export const withLabel: Story = {
    parameters: {
        docs: {
            description: {
                story: 'You can add a custom label to this loader.'
            }
        }
    },
    args: {
        label: 'Here is my label'
    }
};
