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
    searchFolded: {
        name: 'folded',
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

export const argTypesFiltersGroup: Meta['argTypes'] = {
    filtersGroupFolded: {
        name: 'folded',
        control: 'boolean',
        table: { category: 'filters-group' }
    }
};

export const argTypesPanelBar: Meta['argTypes'] = {
    closable: {
        control: 'boolean',
        table: { category: 'panel-bar' }
    },
    hasBackButton: {
        control: 'boolean',
        table: { category: 'panel-bar' }
    }
};

export const argTypesLayout: Meta['argTypes'] = {
    ...argTypesAppBar,
    ...argSearchInput,
    ...argTypesPanel,
    ...argTypesFiltersGroup,
    ...argTypesPanelBar
};


