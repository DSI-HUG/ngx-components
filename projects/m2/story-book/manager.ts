import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

const hugTheme = create({
    base: 'light',
    brandTitle: 'ngx-components - storybook',
    brandImage: 'logo.svg',
    brandTarget: '_self'
});

addons.setConfig({
    theme: hugTheme
});
