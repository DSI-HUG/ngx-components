import { setCompodocJson } from '@storybook/addon-docs/angular';
import type { Preview } from '@storybook/angular';

import docJson from './documentation.json';
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
            options: {
                dark: // Default values
                { name: 'Dark', value: '#333' },

                light: { name: 'Light', value: '#fff' },
                lightblue: { name: 'Lightblue', value: '#b5d8ff' }
            }
        }
    },

    initialGlobals: {
        backgrounds: {
            value: 'light'
        }
    }
};

export default preview;

import './src/polyfills';
