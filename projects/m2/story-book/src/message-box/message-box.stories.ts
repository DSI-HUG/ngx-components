import { type Meta, type StoryObj } from '@storybook/angular';

import { NgxMessageBoxComponent } from '../../../message-box/src/message-box.component';

const meta: Meta<NgxMessageBoxComponent> = {
    title: 'Components/MessageBox',
    component: NgxMessageBoxComponent,
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'select',
            options: ['info', 'primary', 'success', 'warn', 'danger'],
            description: 'Determines the type of the message box. Options include "info", "primary", "success", "warn", and "danger". This also sets the default icon if none is provided.',
            table: {
                type: { summary: 'NgxMessageBoxType' },
                defaultValue: { summary: 'undefined' }
            }
        },
        title: {
            control: 'text',
            description: 'The title displayed in the message box. Used to provide a header or subject for the message.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'undefined' }
            }
        },
        icon: {
            control: 'text',
            description: 'Icon associated with the message box. This can be the name of an icon or a path to an icon image. If not provided, a default icon based on the type will be used.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'undefined' }
            }
        },
        actions: {
            control: 'object',
            description: 'List of actions available in the message box. Each action can include text, type, icon, and an action function to execute. Allows you to customize the actions displayed in the footer of the message box.',
            table: {
                type: { summary: 'readonly NgxMessageBoxAction[]' },
                defaultValue: { summary: 'undefined' }
            }
        },
        horizontal: {
            control: 'boolean',
            description: 'Determines whether the layout of the message box is horizontal (true) or vertical (false). This affects the alignment of the title and content.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        showCloseIcon: {
            control: 'boolean',
            description: 'Indicates whether the close icon should be displayed in the message box. True to show the close icon, false to hide it.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        }
    },
    parameters: {
        docs: {
            description: {
                component: 'The `NgxMessageBoxComponent` is used to display informations to the user'
            }
        }
    }
};
export default meta;
type Story = StoryObj<NgxMessageBoxComponent>;

export const complete: Story = {
    parameters: {
        docs: {
            description: {
                story: 'This story demonstrates the NgxMessageBoxComponent with all inputs configured, including actions, title, icon, and layout options. It shows how the component behaves with various properties and interactive elements.'
            }
        }
    },
    render: args => ({
        props: {
            ...args
        },
        template: `
        <section class="message-box">
            <ngx-message-box
                [type]="type"
                [title]="title"
                [icon]="icon"
                [actions]="actions"
                [horizontal]="horizontal"
                [attr.horizontal]="horizontal|| null"
                [showCloseIcon]="showCloseIcon">
                <p>Content inside the <b>message box</b></p>
                <p>This is a default message box, in vertical layout.</p>
            </ngx-message-box>
        </section>
      `
    }),
    args: {
        type: 'info',
        title: undefined,
        icon: undefined,
        actions: [
            {
                action: (): void => alert('remove action'),
                icon: 'remove'
            },
            {
                action: (): void => alert('add action'),
                icon: 'add'
            }
        ],
        horizontal: false,
        showCloseIcon: false
    }
};

export const basicWarnHorizontal: Story = {
    parameters: {
        docs: {
            description: {
                story: 'This story demonstrates the NgxMessageBoxComponent with a "warn" type and horizontal layout. It shows a simple warning message with default settings.'
            }
        }
    },
    render: args => ({
        props: {
            ...args
        },
        template: `
        <section class="message-box">
            <ngx-message-box
                [type]="type"
                [title]="title"
                [horizontal]="horizontal"
                [attr.horizontal]="horizontal|| null">
                Un message "warn" <b>horizontal</b>
            </ngx-message-box>
        </section>
      `
    }),
    args: {
        type: 'warn',
        horizontal: true,
        showCloseIcon: false,
        title: 'My title'
    }
};

export const customIcon: Story = {
    parameters: {
        docs: {
            description: {
                story: 'It shows a simple success message with default settings but with custom agriculture icon.'
            }
        }
    },
    render: args => ({
        props: {
            ...args
        },
        template: `
        <section class="message-box">
            <ngx-message-box
                [type]="type"
                [title]="title"
                [icon]="icon"
                [horizontal]="horizontal"
                [attr.horizontal]="horizontal|| null">
                Un message "success" <b>horizontal</b>
            </ngx-message-box>
        </section>
      `
    }),
    args: {
        type: 'success',
        icon: 'agriculture',
        horizontal: true,
        showCloseIcon: false,
        title: 'My agriculture icon'
    }
};

export const infoVertical: Story = {
    parameters: {
        docs: {
            description: {
                story: 'This story shows the NgxMessageBoxComponent with an "info" type in vertical layout. It displays a basic informational message with default settings.'
            }
        }
    },
    render: args => ({
        props: {
            ...args
        },
        template: `
        <section class="message-box">
            <ngx-message-box
                [type]="type"
                [title]="title"
                [horizontal]="horizontal"
                [attr.horizontal]="horizontal|| null">
                Un message "info" <b>vertical</b>
            </ngx-message-box>
        </section>
      `
    }),
    args: {
        type: 'info',
        horizontal: false,
        showCloseIcon: true,
        title: 'My title'
    }
};

export const successWithActions: Story = {
    parameters: {
        docs: {
            description: {
                story: 'This story shows the NgxMessageBoxComponent with a "success" type, horizontal layout, and a list of actions. It illustrates how actions can be used within the message box.'
            }
        }
    },
    render: args => ({
        props: {
            ...args
        },
        template: `
        <section class="message-box">
            <ngx-message-box
                [type]="type"
                [title]="title"
                [horizontal]="horizontal"
                [attr.horizontal]="horizontal|| null"
                [actions]="actions">
                Un message "success" avec <b>actions</b>
            </ngx-message-box>
        </section>
      `
    }),
    args: {
        type: 'success',
        horizontal: true,
        actions: [
            {
                text: 'OK',
                action: (): void => alert('OK clicked'),
                icon: 'check'
            },
            {
                text: 'Cancel',
                action: (): void => alert('Cancel clicked'),
                icon: 'cancel'
            }
        ],
        showCloseIcon: true
    }
};

export const noActions: Story = {
    parameters: {
        docs: {
            description: {
                story: 'This story shows the NgxMessageBoxComponent without any actions. It demonstrates how the component looks and behaves when there are no interactive elements in the footer.'
            }
        }
    },
    render: args => ({
        props: {
            ...args
        },
        template: `
        <section class="message-box">
            <ngx-message-box
                [type]="type"
                [title]="title"
                [icon]="icon"
                [horizontal]="horizontal"
                [attr.horizontal]="horizontal|| null"
                [showCloseIcon]="showCloseIcon">
                <p>Content inside the <b>message box</b></p>
                <p>No actions available in this example.</p>
            </ngx-message-box>
        </section>
      `
    }),
    args: {
        type: 'success',
        title: 'Success Message',
        icon: 'done',
        horizontal: false,
        showCloseIcon: true
    }
};

export const horizontalLayout: Story = {
    parameters: {
        docs: {
            description: {
                story: 'This story demonstrates the NgxMessageBoxComponent with a horizontal layout. The content and title are aligned horizontally, which may be useful for certain design requirements.'
            }
        }
    },
    render: args => ({
        props: {
            ...args
        },
        template: `
        <section class="message-box">
            <ngx-message-box
                [type]="type"
                [title]="title"
                [icon]="icon"
                [actions]="actions"
                [horizontal]="horizontal"
                [attr.horizontal]="horizontal|| null"
                [showCloseIcon]="showCloseIcon">
                <p>Content inside the <b>message box</b></p>
                <p>This message box is in horizontal layout.</p>
            </ngx-message-box>
        </section>
      `
    }),
    args: {
        type: 'warn',
        title: 'Warning Message',
        icon: 'home',
        actions: [
            {
                text: 'Acknowledge',
                action: (): void => alert('Acknowledged'),
                icon: 'check'
            }
        ],
        horizontal: true,
        showCloseIcon: true
    }
};

export const noCloseIcon: Story = {
    parameters: {
        docs: {
            description: {
                story: 'This story shows the NgxMessageBoxComponent without the close icon. This configuration is useful if you want to prevent the user from closing the message box manually.'
            }
        }
    },
    render: args => ({
        props: {
            ...args
        },
        template: `
        <section class="message-box">
            <ngx-message-box
                [type]="type"
                [title]="title"
                [icon]="icon"
                [actions]="actions"
                [horizontal]="horizontal"
                [attr.horizontal]="horizontal|| null"
                [showCloseIcon]="false">
                <p>Content inside the <b>message box</b></p>
                <p>This message box does not have a close icon.</p>
            </ngx-message-box>
        </section>
      `
    }),
    args: {
        type: 'danger',
        title: 'Error Message',
        icon: 'error',
        actions: [
            {
                text: 'Retry',
                action: (): void => alert('Retry action'),
                icon: 'refresh'
            }
        ],
        horizontal: true,
        showCloseIcon: false
    }
};
