import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { NgxSnackbarComponent } from '../../../snackbar/m2/snackbar.component';

const meta: Meta<NgxSnackbarComponent> = {
    title: 'Components/Snackbar',
    component: NgxSnackbarComponent,
    decorators: [
        moduleMetadata({
            imports: [
                NgxSnackbarComponent
            ]
        })
    ],
    tags: ['autodocs'],
    argTypes: {
    },
    args: {
    },
    parameters: {
        docs: {
            description: {
                component: 'The `NgxSnackbarComponent` displays an html component inside a bar, as used in [Status](?path=/docs/components-status--docs)'
            }
        }
    }
};
export default meta;
type Story = StoryObj<NgxSnackbarComponent>;

export const complete: Story = {
    parameters: {
        docs: {
            description: {
                story: 'This example showcases a `NgxSnackbarComponent` with a text message displayed for a small duration'
            }
        }
    },
    render: args => ({
        props: {
            ...args
        },
        template: `
        <section class="snack">
          <ngx-snackbar 
            alignment="bottom right" 
            [duration]="5000"
            [delay]="1000">
                text displayed in the <b>bottom right</b> during <b>5</b> seconds, after <b>1</b> second
            </ngx-snackbar>
        </section>
      `
    }),
    args: {}
};
