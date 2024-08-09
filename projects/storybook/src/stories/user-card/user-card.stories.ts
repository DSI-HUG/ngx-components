import { type Meta, type StoryObj } from '@storybook/angular';

import { StorybookUserCardComponent } from './user-card.component';


const meta: Meta<StorybookUserCardComponent> = {
    title: 'User card',
    component: StorybookUserCardComponent,
    tags: ['autodocs'],
    parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen'
    }
};

export default meta;
type Story = StoryObj<StorybookUserCardComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const basic: Story = {
    argTypes: {
        user: {
            table: {
                type: { summary: 'NgxUserCard' }
            }
        },
        expanded: {
            table: {
                defaultValue: {
                    summary: 'true'
                },
                type: { summary: 'boolean' }
            }
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

export const notExpanded: Story = {
    argTypes: {
        user: {
            table: {
                type: { summary: 'NgxUserCard' }
            }
        },
        expanded: {
            table: {
                defaultValue: {
                    summary: 'true'
                },
                type: { summary: 'boolean' }
            }
        }
    },
    args: {
        user: {
            title: 'Monsieur',
            firstname: 'Albert',
            lastname: 'Lullin',
            initials: 'alul',
            type: 'Type',
            email: 'albert.lullin@hug.ch',
            role: 'Medecin',
            groupFunctionLabel: 'Group',
            familyCode: 'Médecin dentiste',
            functionSefName: 'SefNameFunction',
            functionSefCode: 'SefCodeFunction',
            organisation: 'HUG',
            speciality: 'Neurochirurgie',
            esoN3Label: 'EsoN3Label',
            login: 'LullinLogin',
            phone: '+44 150 509 39',
            bip: '8859595',
            mobile: '+44 150 509 39',
            address: 'Lucerne, 0 James tutuche ',
            city: 'Lucerne',
            zipCode: '6006'
        },
        expanded: false
    }
};

export const notExpanded2: Story = {
    argTypes: {
        user: {
            table: {
                type: { summary: 'NgxUserCard' }
            }
        },
        expanded: {
            table: {
                defaultValue: {
                    summary: 'true'
                },
                type: { summary: 'boolean' }
            }
        }
    },
    args: {
        user: {
            title: 'Madame',
            firstname: 'Ludivine',
            lastname: 'Coluche',
            initials: 'lcol',
            type: 'Type',
            email: 'ludivine.colluche@hug.ch',
            role: 'Infirmière',
            groupFunctionLabel: 'Group',
            familyCode: 'Médico-technique',
            functionSefName: 'SefNameFunction',
            functionSefCode: 'SefCodeFunction',
            organisation: 'HUG',
            speciality: 'Neurochirurgie',
            specialty1: 'Dermatologie',
            specialty2: 'Pedicure',
            esoN3Label: 'EsoN3Label',
            login: 'LddsdsdLogin',
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