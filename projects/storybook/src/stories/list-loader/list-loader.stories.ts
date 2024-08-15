import { type Meta, type StoryObj } from '@storybook/angular';

import { NgxListLoaderComponent } from '../../../../list-loader/src/list-loader.component';


const meta: Meta<NgxListLoaderComponent> = {
    title: 'Components/List Loader',
    component: NgxListLoaderComponent,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'The `NgxListLoaderComponent` is used to display a loading indicator when fetching large amounts of data. It includes a spinner animation and an optional label for context.'
            }
        }
    },
    argTypes: {
        label: {
            description: 'The label text displayed alongside the loader.',
            control: {
                type: 'text'
            },
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' }
            }
        }
    }
};

export default meta;
type Story = StoryObj<NgxListLoaderComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const standard: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Displays the default loader without a label. This is useful when no additional context is needed.'
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
                story: 'Shows the loader with a custom label. This can be used to provide additional information or context while the data is loading.'
            }
        }
    },
    args: {
        label: 'Loading data, please wait...'
    }
};

export const withLongLabel: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Displays the loader with a long label to test how it handles extended text. This is useful to ensure that the layout accommodates longer messages.'
            }
        }
    },
    args: {
        label: 'This is a very long label that we use to test how the loader handles extended text. It should wrap or truncate gracefully depending on the design.'
    }
};