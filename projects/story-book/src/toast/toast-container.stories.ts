import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { NgxToastContainerComponent } from '../../../layout/src/toast/toast-container.component';
import { StorybookToastContainerWrapperComponent } from './toast-container-wrapper.component';

const meta: Meta<NgxToastContainerComponent> = {
    title: 'Components/Toast Container',
    component: NgxToastContainerComponent,
    decorators: [
        moduleMetadata({
            imports: [
                StorybookToastContainerWrapperComponent
            ]
        })
    ],
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'The `NgxToastContainerComponent` displays a stack of toast messages in the bottom-right corner. Use the button to add toast items.'
            }
        }
    }
};
export default meta;
type Story = StoryObj<NgxToastContainerComponent>;

export const interactive: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Click “Ajouter” in the center of the screen to add an InfoToast through ToastService.add(). Hover over the stack to expand and inspect it.'
            }
        }
    },
    render: () => ({
        template: '<storybook-toast-container-wrapper />'
    })
};
