import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { NgxUserCardComponent } from '../../../../user-card/src/user-card.component';


const meta: Meta<NgxUserCardComponent> = {
    title: 'Components/User Card',
    component: NgxUserCardComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [
                MatButtonToggleModule
            ]
        })
    ],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'The `NgxUserCardComponent` displays user information. The UserCard can be expanded or compressed, showing or hiding additional details based on the `expanded` input.'
            }
        }
    },
    argTypes: {
        expanded: {
            control: 'boolean',
            table: {
                defaultValue: {
                    summary: 'true'
                },
                type: { summary: 'boolean' }
            },
            description: 'Set to false to have a compressed UserCard with less information.'
        },
        user: {
            control: 'object',
            table: {
                type: { summary: 'NgxUserCard' }
            },
            description: 'User information object for displaying in the card.'
        }
    },
    args: {
        user: {
            title: 'Docteur',
            firstname: 'Jean',
            lastname: 'PATATE',
            initials: 'jpat',
            type: 'Type',
            email: 'jean.patate@hug.ch',
            role: 'Medecin',
            groupFunctionLabel: 'Group',
            familyCode: 'Infirmier-e', // This value will influence badge color
            functionSefName: 'SefNameFunction',
            functionSefCode: 'SefCodeFunction',
            organisation: 'HUG',
            speciality: 'Neurochirurgie',
            specialty1: 'Dermatologie',
            specialty2: 'Pedicure',
            esoN3Label: 'EsoN3Label',
            login: 'PatateLogin',
            phone: '+44 150 509 39',
            bip: '8859595',
            mobile: '+44 150 509 39',
            address: 'Carouge, 7 Rue St Julien',
            city: 'Carouge',
            zipCode: '1227'
        },
        expanded: false
    }
};

export default meta;

type Story = StoryObj<NgxUserCardComponent>;

export const standard: Story = {
    args: {
        expanded: true
    }
};

export const notExpandedUserCard: Story = {
    parameters: {
        docs: {
            description: {
                story: 'You can set the "expanded" property to false to have a compressed UserCard with less information.'
            }
        }
    }
};

export const dynamicBadgeColor: Story = {
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
            familyCodeChanged(code: string): void {
                this['user'] = {
                    title: 'Professeur',
                    firstname: 'Jean',
                    lastname: 'PATATE',
                    initials: 'jpat',
                    type: 'Type',
                    email: 'jean.patate@hug.ch',
                    role: 'Medecin',
                    groupFunctionLabel: 'Group',
                    familyCode: code,
                    functionSefName: 'SefNameFunction',
                    functionSefCode: 'SefCodeFunction',
                    organisation: 'HUG',
                    speciality: 'Neurochirurgie',
                    specialty1: 'Dermatologie',
                    specialty2: 'Pedicure',
                    esoN3Label: 'EsoN3Label',
                    login: 'PatateLogin',
                    phone: '+44 150 509 39',
                    bip: '8859595',
                    mobile: '+44 150 509 39',
                    address: 'Carouge, 7 Rue St Julien',
                    city: 'Carouge',
                    zipCode: '1227'
                };
            }
        },
        template: `
        <section>
          <ngx-user-card [user]="user" [expanded]="false"></ngx-user-card>
          <br />
          <div class="matButtonContainer">
            <mat-button-toggle-group name="favoriteColor" hideSingleSelectionIndicator="true" (change)="familyCodeChanged($event.value)" [value]="user.familyCode">
                <mat-button-toggle value="Social">Social</mat-button-toggle>    
                <mat-button-toggle value="Infirmier-e">Infirmier-e</mat-button-toggle>
                <mat-button-toggle value="Médecin dentiste">Médecin dentiste</mat-button-toggle>
                <mat-button-toggle value="a text">Custom text</mat-button-toggle>
                <mat-button-toggle value="">Empty</mat-button-toggle>
            </mat-button-toggle-group>
          </div>
        </section>
      `
    }),
    args: {
        user: {
            title: 'Professeur',
            firstname: 'Jean',
            lastname: 'PATATE',
            initials: 'jpat',
            type: 'Type',
            email: 'jean.patate@hug.ch',
            role: 'Medecin',
            groupFunctionLabel: 'Group',
            familyCode: 'Social',
            functionSefName: 'SefNameFunction',
            functionSefCode: 'SefCodeFunction',
            organisation: 'HUG',
            speciality: 'Neurochirurgie',
            specialty1: 'Dermatologie',
            specialty2: 'Pedicure',
            esoN3Label: 'EsoN3Label',
            login: 'PatateLogin',
            phone: '+44 150 509 39',
            bip: '8859595',
            mobile: '+44 150 509 39',
            address: 'Carouge, 7 Rue St Julien',
            city: 'Carouge',
            zipCode: '1227'
        }
    }
};

export const userAbbreviationTitle: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Depending on the user\'s "title" property given, the UserCard will display its abbreviation.<br /><ul><li>Docteur / Docteure : <code>Dr</code>, <code>Dre</code></li><li>Monsieur / Madame : <code>M</code>, <code>Mme</code></li><li>Professeur / Professeure : <code>Pr</code>, <code>Pre</code></li></ul>Any other text in the "title" property will be displayed entirely.'
            }
        }
    },
    render: args => ({
        props: {
            ...args,
            titleChanged(code: string): void {
                this['user'] = {
                    title: code,
                    firstname: 'Jean',
                    lastname: 'PATATE',
                    initials: 'jpat',
                    type: 'Type',
                    email: 'jean.patate@hug.ch',
                    role: 'Medecin',
                    groupFunctionLabel: 'Group',
                    familyCode: 'Soins',
                    functionSefName: 'SefNameFunction',
                    functionSefCode: 'SefCodeFunction',
                    organisation: 'HUG',
                    speciality: 'Neurochirurgie',
                    specialty1: 'Dermatologie',
                    specialty2: 'Pedicure',
                    esoN3Label: 'EsoN3Label',
                    login: 'PatateLogin',
                    phone: '+44 150 509 39',
                    bip: '8859595',
                    mobile: '+44 150 509 39',
                    address: 'Carouge, 7 Rue St Julien',
                    city: 'Carouge',
                    zipCode: '1227'
                };
            }
        },
        template: `
        <section>
          <ngx-user-card [user]="user" [expanded]="false"></ngx-user-card>
          <br />
          <div class="matButtonContainer">
            <mat-button-toggle-group name="title" hideSingleSelectionIndicator="true" (change)="titleChanged($event.value)" [value]="user.title">
                <mat-button-toggle value="Docteur">Docteur</mat-button-toggle>
                <mat-button-toggle value="Docteure">Docteure</mat-button-toggle>
                <mat-button-toggle value="Monsieur">Monsieur</mat-button-toggle>
                <mat-button-toggle value="Madame">Madame</mat-button-toggle>
                <mat-button-toggle value="Professeur">Professeur</mat-button-toggle>
                <mat-button-toggle value="Professeure">Professeure</mat-button-toggle>
                <mat-button-toggle value="OtherTitle">OtherTitle</mat-button-toggle>
            </mat-button-toggle-group>
          </div>
        </section>
      `
    }),
    args: {
        user: {
            title: 'Professeur',
            firstname: 'Jean',
            lastname: 'PATATE',
            initials: 'jpat',
            type: 'Type',
            email: 'jean.patate@hug.ch',
            role: 'Medecin',
            groupFunctionLabel: 'Group',
            familyCode: 'Infirmier-e',
            functionSefName: 'SefNameFunction',
            functionSefCode: 'SefCodeFunction',
            organisation: 'HUG',
            speciality: 'Neurochirurgie',
            specialty1: 'Dermatologie',
            specialty2: 'Pedicure',
            esoN3Label: 'EsoN3Label',
            login: 'PatateLogin',
            phone: '+44 150 509 39',
            bip: '8859595',
            mobile: '+44 150 509 39',
            address: 'Carouge, 7 Rue St Julien',
            city: 'Carouge',
            zipCode: '1227'
        }
    }
};

export const userWithMissingInfo: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Displays the component when certain user information is missing. This helps ensure that the rendering remains consistent even with incomplete data.'
            }
        }
    },
    args: {
        user: {
            title: 'Professor',
            firstname: 'Jean',
            lastname: 'PATATE',
            initials: 'jpat',
            email: 'jean.patate@hug.ch',
            // Phone number and address are missing
        },
        expanded: true
    }
};