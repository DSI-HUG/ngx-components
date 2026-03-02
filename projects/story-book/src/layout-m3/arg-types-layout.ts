import { Meta } from '@storybook/angular';

const argTypesAppBar: Meta['argTypes'] = {
    mode: {
        control: 'radio',
        table: { category: 'app-bar' },
        options: ['standard', 'condensed']
    },
    title: {
        control: 'text',
        table: { category: 'app-bar' }
    },
    subtitle: {
        control: 'text',
        table: { category: 'app-bar' }
    },
    helpUrl: {
        control: 'text',
        table: { category: 'app-bar' }
    },
    withBackIcon: {
        control: 'boolean',
        table: { category: 'app-bar' }
    }
};

export const argSearchInput: Meta['argTypes'] = {
    folded: {
        control: 'boolean',
        table: { category: 'search-bar-container' }
    }
};

export const argTypesPanel: Meta['argTypes'] = {
    appearance: {
        control: 'radio',
        table: { category: 'panel' },
        options: ['default', 'transparent']
    },
    contentPadding: {
        control: 'radio',
        table: { category: 'panel' },
        options: ['regular', 'none']
    }
};

export const argTypesLayout: Meta['argTypes'] = {
    ...argTypesAppBar,
    ...argSearchInput,
    ...argTypesPanel
};


