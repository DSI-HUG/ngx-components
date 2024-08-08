import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { NgxUserCardComponent } from '../user-card.component';
import { StorybookUserCardComponent } from './user-card.component';

const meta: Meta<StorybookUserCardComponent> = {
    title: 'User-card',
    component: StorybookUserCardComponent,
    tags: ['autodocs'],
    parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen'
    },
    decorators: [
        moduleMetadata({
            declarations: [],
            imports: [
                NgxUserCardComponent
            ]
        })
    ]
};

export default meta;
type Story = StoryObj<StorybookUserCardComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const expanded: Story = {
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

export const notExpanded: Story = {
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
