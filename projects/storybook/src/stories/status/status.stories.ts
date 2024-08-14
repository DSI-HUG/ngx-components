import { CommonModule } from '@angular/common';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { NgxStatusService } from '../../../../status/src/status.service';
import { NgxStatusComponent } from '../../../../status/src/status.component';
import { NgxSnackbarComponent } from '../../../../snackbar/src/snackbar.component';
import { NgxStatusModule } from '../../../../status/src/status.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

const meta: Meta<NgxStatusComponent> = {
    title: 'Components/Status',
    component: NgxStatusComponent,
    decorators: [
        moduleMetadata({
            imports: [
                CommonModule, NgxSnackbarComponent, NgxStatusModule, MatButtonToggleModule
            ],
            providers: [NgxStatusService]
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
                component: 'This component is used to display informations to the user in a popup.<br />This component uses the NgxSnackbar component.'
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
                story: 'Depending on the user\'s "familyCode" property given, the UserCard can have a green, blue, red or gray colored badge.<br /><ul><li>Green : <code>Médico-technique</code>, <code>Social</code>, <code>Médico-thérapeutique</code>, <code>Pharmacie</code></li><li>Blue : <code>Soins</code>, <code>Infirmier-e</code></li><li>Red : <code>Médecin dentiste</code>, <code>Médecin</code></li><li>Gray : Any other text</li><li>Nothing : Empty familyCode</li></ul>'
            }
        }
    },
    render: args => ({
        props: {
            ...args,
        },
        template: `
        <section>
          <ngx-status [status]="status"></ngx-status>
        </section>
      `
    }),
    args: {
        status: {
            title: 'Mon titre de status',
            type: 'info',
            text: 'Attention, voici mon texte',
            date: new Date(),
            duration: 5000,
            className: 'maClassCss',
            technicalText: 'Ici mon texte technique',
            actions: [
                {
                    label: 'Action 1',
                    callback: (): void => {
                        console.log('Resultat Action 1');
                        return;
                    }
                }
            ]
        }
    }
};

export const minimumRequired: Story = {
    parameters: {
        docs: {
            description: {
                story: 'You need to provide an NgxStatus object with at least a<code>title</code>and a<code>type</code>'
            }
        }
    },
    render: args => ({
        props: {
            ...args,
        },
        template: `
        <section>
          <ngx-status [status]="status"></ngx-status>
        </section>
      `
    }),
    args: {
        status: {
            title: 'Mon titre de status',
            type: 'info'
        }
    }
};

export const statusText: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Depending on the NgxStatus object having at least a<code>title</code>and a<code>type</code>, you can add a<code>text</code>to this object.'
            }
        }
    },
    render: args => ({
        props: {
            ...args,
        },
        template: `
        <section>
          <ngx-status [status]="status"></ngx-status>
        </section>
      `
    }),
    args: {
        status: {
            title: 'Mon titre de status',
            type: 'info',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation'
        }
    }
};

export const statusType: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The<code>status.type</code>can have different values: <ul><li>primary</li> <li>info</li><li>success</li><li>warn</li><li>danger</li></ul>'
            }
        }
    },
    render: args => ({
        props: {
            ...args,            
            typeChanged(code: string): void {
                this['status'] = {
                    title: 'Mon titre de status',
                    type: code,
                    text: 'Attention, voici mon texte'
                };
            }
        },
        template: `
        <section>
            <ngx-status [status]="status"></ngx-status>
            <br />
            <div class="matButtonContainer">
                <mat-button-toggle-group name="type" hideSingleSelectionIndicator="true" (change)="typeChanged($event.value)" [value]="status.type">
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
            title: 'Mon titre de status',
            type: 'success',
            text: 'Attention, voici mon texte'
        }
    }
};

export const statusTechnicalText: Story = {
    parameters: {
        docs: {
            description: {
                story: 'If you provide an NgxStatus object with a<code>technicalText</code>and a<code>date</code>, an "information" icon will be visible at the top right of the NgxStatusComponent. If you click on it, an ngx-message-box will appear to display this<code>technicalText</code>as well as the<code>date</code>'
            }
        }
    },
    render: args => ({
        props: {
            ...args,
        },
        template: `
        <section>
            <ngx-status [status]="status"></ngx-status>
        </section>
      `
    }),
    args: {
        status: {
            title: 'Mon titre Erreur',
            type: 'danger',
            date: new Date(),
            text: 'Attention, voici mon texte erreur,',
            technicalText: 'Ici mon texte technique'
        }
    }
};

export const statusActions: Story = {
    parameters: {
        docs: {
            description: {
                story: 'You can add <code>actions</code> to the NgxStatus object'
            }
        }
    },
    render: args => ({
        props: {
            ...args,
        },
        template: `
        <section>
          <ngx-status [status]="status"></ngx-status>
        </section>
      `
    }),
    args: {
        status: {
            title: 'Mon titre',
            type: 'info',
            text: 'Attention, voici mon texte',
            actions: [
                {
                    label: 'Action 1',
                    callback: (): void => {
                        console.log('Resultat Action 1');
                        return;
                    }
                },
                {
                    label: 'Action 2',
                    callback: (): void => {
                        console.log('Resultat Action 2');
                        return;
                    }
                },
                {
                    label: 'Action 3',
                    callback: (): void => {
                        console.log('Resultat Action 3');
                        return;
                    }
                },
                {
                    label: 'Action 4',
                    callback: (): void => {
                        console.log('Resultat Action 4');
                        return;
                    }
                }
            ]
        }
    }
};

export const statusDuration: Story = {
    parameters: {
        docs: {
            description: {
                story: 'You can add <code>duration</code> to the NgxStatus object.<br />Without a defined duration, the popup remains by default 30s for a danger type object and 8s for other types.'
            }
        }
    },
    render: args => ({
        props: {
            ...args,
        },
        template: `
        <section>
            <ngx-status [status]="status"></ngx-status>
        </section>
      `
    }),
    args: {
        status: {
            title: 'Mon titre',
            type: 'info',
            text: 'Attention, voici mon texte',
            duration: 3000
        }
    }
};

export const statusCustomCssClass: Story = {
    parameters: {
        docs: {
            description: {
                story: 'You can provide the NgxStatus object with a<code>className</code>to manage your own css style.'
            }
        }
    },
    render: args => ({
        props: {
            ...args,
        },
        template: `
        <section>
            <ngx-status [status]="status"></ngx-status>
        </section>
      `
    }),
    args: {
        status: {
            title: 'Mon titre',
            type: 'info',
            text: 'Attention, voici mon texte',
            className: 'maCustomClassCss',
        }
    }
};