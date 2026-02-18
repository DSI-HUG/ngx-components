import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { applicationConfig, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { NgxSnackbarComponent } from '../../../snackbar/src/snackbar.component';
import { provideNgxStatus } from '../../../status/src/providers';
import { NgxStatusComponent } from '../../../status/src/status.component';
import { NgxStatusService } from '../../../status/src/status.service';

const meta: Meta<NgxStatusComponent> = {
    title: 'Components/Status',
    component: NgxStatusComponent,
    decorators: [
        applicationConfig({
            providers: [
                provideNgxStatus()
            ]
        }),
        moduleMetadata({
            imports: [
                NgxSnackbarComponent
            ],
            providers: [NgxStatusService]
        })
    ],
    tags: ['autodocs'],
    argTypes: {
        status: {
            description: 'The object containing the status details to be displayed.',
            control: {
                type: 'object'
            },
            table: {
                type: { summary: 'NgxStatus' },
                defaultValue: { summary: 'undefined' }
            }
        }
    },
    args: {
    },
    parameters: {
        docs: {
            description: {
                component: 'The `NgxStatusComponent` displays informational messages in a popup, leveraging the `NgxSnackbarComponent`. It supports various types of notifications, custom actions, and detailed technical information.'
            }
        }
    }
};
export default meta;
type Story = StoryObj<NgxStatusComponent>;

export const complete: Story = {
    parameters: {
        docs: {
            description: {
                story: 'This example showcases a `NgxStatusComponent` with all available features, including title, type, text, date, duration, custom CSS class, technical text, and multiple actions.'
            }
        }
    },
    render: args => ({
        props: {
            ...args
        },
        template: `
        <section class="status">
          <ngx-status [status]="status"></ngx-status>
        </section>
      `
    }),
    args: {
        status: {
            title: 'Sample Status Title',
            subtitle: 'A big subtitle to add some more context to this small toast',
            type: 'info',
            text: 'This is a sample status message.',
            date: new Date(),
            duration: 5000,
            className: 'my-custom-css-class-2',
            technicalText: 'Technical details about the status.',
            actions: [
                {
                    label: 'Action 1',
                    callback: (): void => console.log('Action 1 triggered.')
                },
                {
                    label: 'Action 2',
                    callback: (): void => console.log('Action 2 triggered.')
                }
            ]
        }
    }
};

export const minimumRequired: Story = {
    parameters: {
        docs: {
            description: {
                story: 'This example demonstrates the `NgxStatusComponent` with only the required fields: `title` and `type`. Additional fields are optional.'
            }
        }
    },
    render: args => ({
        props: {
            ...args
        },
        template: `
        <section class="status">
          <ngx-status [status]="status"></ngx-status>
        </section>
      `
    }),
    args: {
        status: {
            title: 'Sample Status Title',
            type: 'info'
        }
    }
};

export const statusText: Story = {
    parameters: {
        docs: {
            description: {
                story: 'This example demonstrates how to use the `text` property to display additional information in the status component.'
            }
        }
    },
    render: args => ({
        props: {
            ...args
        },
        template: `
        <section class="status">
          <ngx-status [status]="status"></ngx-status>
        </section>
      `
    }),
    args: {
        status: {
            title: 'Sample Status Title',
            type: 'info',
            text: 'Detailed message providing more context about the status.'
        }
    }
};

export const statusType: Story = {
    decorators: [
        moduleMetadata({
            imports: [
                MatButtonToggleGroup, MatButtonToggle
            ]
        })
    ],
    parameters: {
        docs: {
            description: {
                story: 'This example illustrates the different `type` values that the `NgxStatusComponent` can have: `primary`, `info`, `success`, `warn`, and `danger`. Use the buttons to switch between types.'
            }
        }
    },
    render: args => ({
        props: {
            ...args,
            typeChanged(type: string): void {
                this['status'] = {
                    title: 'Sample Status Title',
                    type: type,
                    text: 'Sample text for the status message.'
                };
            }
        },
        template: `
        <section class="status">
            <ngx-status [status]="status"></ngx-status>
            <br />
            <div class="matButtonContainer">
                <mat-button-toggle-group name="type" (change)="typeChanged($event.value)" [value]="status.type">
                    <mat-button-toggle value="primary">primary</mat-button-toggle>
                    <mat-button-toggle value="info">info</mat-button-toggle>
                    <mat-button-toggle value="success">success</mat-button-toggle>
                    <mat-button-toggle value="warn">warn</mat-button-toggle>
                    <mat-button-toggle value="danger">danger</mat-button-toggle>
                </mat-button-toggle-group>
            </div>
        </section>
      `
    }),
    args: {
        status: {
            title: 'Sample Status Title',
            type: 'success',
            text: 'Sample text for the status message.'
        }
    }
};

export const statusTechnicalText: Story = {
    parameters: {
        docs: {
            description: {
                story: 'This example shows how to include `technicalText` and `date` in the `NgxStatusComponent`. An info icon will appear, and clicking it will show the technical details in a dialog.'
            }
        }
    },
    render: args => ({
        props: {
            ...args
        },
        template: `
        <section class="status">
            <ngx-status [status]="status"></ngx-status>
        </section>
      `
    }),
    args: {
        status: {
            title: 'Error Status',
            type: 'danger',
            date: new Date(),
            text: 'This is an error message.',
            technicalText: 'Detailed technical information about the error.'
        }
    }
};

export const statusActions: Story = {
    parameters: {
        docs: {
            description: {
                story: 'This example demonstrates how to add actions to the `NgxStatusComponent`. Each action can be triggered with a callback.'
            }
        }
    },
    render: args => ({
        props: {
            ...args
        },
        template: `
        <section class="status">
          <ngx-status [status]="status"></ngx-status>
        </section>
      `
    }),
    args: {
        status: {
            title: 'Sample Status Title',
            type: 'info',
            text: 'Message with multiple actions.',
            actions: [
                {
                    label: 'Action 1',
                    callback: (): void => alert('Action 1 executed.')
                },
                {
                    label: 'Action 2',
                    callback: (): void => alert('Action 2 executed.')
                }
            ]
        }
    }
};

export const statusDuration: Story = {
    parameters: {
        docs: {
            description: {
                story: 'This example demonstrates setting a custom `duration` for the `NgxStatusComponent`. By default, the duration is 30 seconds for danger types and 8 seconds for other types.'
            }
        }
    },
    render: args => ({
        props: {
            ...args
        },
        template: `
        <section class="status">
            <ngx-status [status]="status"></ngx-status>
        </section>
      `
    }),
    args: {
        status: {
            title: 'Sample Status Title',
            type: 'info',
            text: 'Message with custom duration.',
            duration: 3000 // Duration in milliseconds
        }
    }
};

export const statusCustomCssClass: Story = {
    parameters: {
        docs: {
            description: {
                story: 'This example shows how to apply custom CSS styles to the `NgxStatusComponent` using the `className` property.'
            }
        }
    },
    render: args => ({
        props: {
            ...args
        },
        template: `
        <section class="status">
            <ngx-status [status]="status"></ngx-status>
        </section>
      `
    }),
    args: {
        status: {
            title: 'Sample Status Title',
            type: 'info',
            text: 'Message with custom CSS class.',
            className: 'my-custom-css-class'
        }
    }
};
