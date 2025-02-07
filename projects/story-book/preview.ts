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
            values: [
                // Default values
                { name: 'Dark', value: '#333' },
                { name: 'Light', value: '#fff' },
                { name: 'Lightblue', value: '#b5d8ff' }
            ],
            // Specify which background is shown by default
            default: 'Light'
        }
    }
};

export default preview;
