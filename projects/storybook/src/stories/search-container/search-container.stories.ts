import { type Meta, type StoryObj } from '@storybook/angular';

import { StorybookSearchContainerComponent } from './search-container.component';


const meta: Meta<StorybookSearchContainerComponent> = {
    title: 'Search container',
    component: StorybookSearchContainerComponent,
    tags: ['autodocs'],
    parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen'
    }
};

export default meta;
type Story = StoryObj<StorybookSearchContainerComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const standard: Story = {
};

export const changeClearTooltipLabel: Story = {
    args: {
        clearTooltipLabel: 'Mon nouveau label pour effacer'
    }
};
