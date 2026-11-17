import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { NgxSnackbarContainerComponent } from '../../../layout/src/snackbar/snackbar-container.component';
import { StorybookSnackbarContainerWrapperComponent } from './snackbar-container-wrapper.component';

const meta: Meta<NgxSnackbarContainerComponent> = {
    title: 'Components/Snackbar Container',
    component: NgxSnackbarContainerComponent,
    decorators: [
        moduleMetadata({
            imports: [
                StorybookSnackbarContainerWrapperComponent
            ]
        })
    ],
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'The `NgxSnackbarContainerComponent` displays a stack of snackbar messages in the bottom-right corner. Use the button to add snackbar items.'
            }
        }
    }
};
export default meta;
type Story = StoryObj<NgxSnackbarContainerComponent>;

export const interactive: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Click “Ajouter” in the center of the screen to add an InfoSnackbar through SnackbarService.add(). Hover over the stack to expand and inspect it.'
            }
        }
    },
    render: () => ({
        template: '<storybook-snackbar-container-wrapper />'
    })
};
