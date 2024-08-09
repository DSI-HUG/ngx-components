import { type Meta, type StoryObj } from '@storybook/angular';

import { StorybookListLoaderComponent } from './list-loader.component';


const meta: Meta<StorybookListLoaderComponent> = {
    title: 'List loader',
    component: StorybookListLoaderComponent,
    // tags: ['autodocs'],
    parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen'
    }
};

export default meta;
type Story = StoryObj<StorybookListLoaderComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const standard: Story = {

};

export const withLabel: Story = {
args: {
    label: 'Voici mon label'
}
};