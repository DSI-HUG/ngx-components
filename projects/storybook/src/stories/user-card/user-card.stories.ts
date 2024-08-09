import { type Meta, type StoryObj } from '@storybook/angular';
import { NgxUserCardComponent } from '../../../../user-card/src/user-card.component';


const meta: Meta<NgxUserCardComponent> = {
    title: 'User card',
    component: NgxUserCardComponent,
    tags: ['autodocs'],
    parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
        docs: {
            description: {
                component: 'This component allows you to display user information'
                        }
        }
    }
};

export default meta;

type Story = StoryObj<NgxUserCardComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const standard: Story = {
    parameters: {
        docs: {
            description: {
               story: 'Standard NgxUserCard component'
            }
        }
    },
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
            },
            description: 'Set to false to have a compressed UserCard with less information.'
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
        },
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
        },
        expanded: false
    }
};

export const badgeIconColor: Story = {
    parameters: {
        docs: {
            description: {
               story: 'Depending on the user\'s "familyCode" property given, the UserCard can have a green, blue, red or gray colored badge.<br /><ul><li>Green : <code>Médico-technique</code>, <code>Social</code>, <code>Médico-thérapeutique</code>, <code>Pharmacie</code></li><li>Blue : <code>Soins</code>, <code>Infirmier-e</code></li><li>Red : <code>Médecin dentiste</code>, <code>Médecin</code></li><li>Gray : everything else</li></ul>Below I have a user with a familyCode <code>Médecin</code>. You can see the red tag.',
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
            familyCode: 'Médecin',
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
        // users:[ {
        //     title: 'Madame',
        //     firstname: 'Ludivine',
        //     lastname: 'Coluche',
        //     initials: 'lcol',
        //     type: 'Type',
        //     email: 'ludivine.colluche@hug.ch',
        //     role: 'Infirmière',
        //     groupFunctionLabel: 'Group',
        //     familyCode: 'Médico-technique',
        //     functionSefName: 'SefNameFunction',
        //     functionSefCode: 'SefCodeFunction',
        //     organisation: 'HUG',
        //     speciality: 'Neurochirurgie',
        //     specialty1: 'Dermatologie',
        //     specialty2: 'Pedicure',
        //     esoN3Label: 'EsoN3Label',
        //     login: 'LddsdsdLogin',
        //     phone: '+44 150 509 39',
        //     bip: '8859595',
        //     mobile: '+44 150 509 39',
        //     address: 'Carouge, 7 Rue St Julien',
        //     city: 'Carouge',
        //     zipCode: '1227'
        // }, {
        //     title: 'Monsieur',
        //     firstname: 'Albert',
        //     lastname: 'Lullin',
        //     initials: 'alul',
        //     type: 'Type',
        //     email: 'albert.lullin@hug.ch',
        //     role: 'Medecin',
        //     groupFunctionLabel: 'Group',
        //     familyCode: 'Médecin dentiste',
        //     functionSefName: 'SefNameFunction',
        //     functionSefCode: 'SefCodeFunction',
        //     organisation: 'HUG',
        //     speciality: 'Neurochirurgie',
        //     esoN3Label: 'EsoN3Label',
        //     login: 'LullinLogin',
        //     phone: '+44 150 509 39',
        //     bip: '8859595',
        //     mobile: '+44 150 509 39',
        //     address: 'Lucerne, 0 James tutuche ',
        //     city: 'Lucerne',
        //     zipCode: '6006'
        // },    {
        //     title: 'Monsieur',
        //     firstname: 'Philippe',
        //     lastname: 'Wellls',
        //     initials: 'pwls',
        //     type: 'Type',
        //     email: 'albert.lullin@hug.ch',
        //     role: 'Medecin',
        //     groupFunctionLabel: 'Group',
        //     familyCode: 'Rien',
        //     functionSefName: 'SefNameFunction',
        //     functionSefCode: 'SefCodeFunction',
        //     organisation: 'HUG',
        //     speciality: 'Neurochirurgie',
        //     esoN3Label: 'EsoN3Label',
        //     login: 'LullinLogin',
        //     phone: '+44 150 509 39',
        //     bip: '8859595',
        //     mobile: '+44 150 509 39',
        //     address: 'Lucerne, 0 James tutuche ',
        //     city: 'Lucerne',
        //     zipCode: '6006'
        // }],
        expanded: false
    }
};

export const userAbbreviationTitle: Story = {
    parameters: {
        docs: {
            description: {
               story: 'Depending on the user\'s "title" property given, the UserCard will display its abbreviation.<br /><ul><li>Docteur / Docteure : <code>Dr</code>, <code>Dre</code></li><li>Monsieur / Madame : <code>M</code>, <code>Mme</code></li><li>Professeur / Professeure : <code>Pr</code>, <code>Pre</code></li></ul>Any other text in the "title" property will be displayed entirely.<br />Below I have a user with a title <code>Professeur</code>. You can see its abbreviation <code>Pr.</code> on the UserCard.',
            }
        }
    },
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
        },
        expanded: false
    }
};
