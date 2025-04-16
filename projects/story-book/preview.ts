import { setCompodocJson } from '@storybook/addon-docs/angular';
import { withThemeByClassName } from '@storybook/addon-themes';
import type { AngularRenderer, Preview } from '@storybook/angular';

import docJson from './documentation.json';
import { ResponsiveManager } from './src/addons/responsive-manager';

setCompodocJson(docJson);

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        },
        layout: 'centered',
        backgrounds: {
            values: [
                // Default values
                { name: 'Dark', value: '#333' },
                { name: 'Light', value: '#fff' },
                { name: 'Lightblue', value: '#b5d8ff' }
            ],
            // Specify which background is shown by default
            default: 'Light'
        }
    },
    decorators: [
        withThemeByClassName<AngularRenderer>({
            parentSelector: 'html',
            themes: {
                light: 'light',
                dark: 'dark'
            },
            defaultTheme: 'light'
        })
    ]
};

ResponsiveManager.listenWindowSize();

export default preview;
