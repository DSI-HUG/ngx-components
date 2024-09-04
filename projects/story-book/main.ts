import type { StorybookConfig } from '@storybook/angular';
import { dirname, join } from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
const getAbsolutePath = (value: string): string => dirname(require.resolve(join(value, 'package.json')));

const config: StorybookConfig = {
    stories: [
        './src/**/*.mdx',
        './src/**/*.stories.@(js|jsx|mjs|ts|tsx)'
    ],
    addons: [
        {
            name: getAbsolutePath('@storybook/addon-essentials'),
            options: {
                'actions': false
            }
        },
        getAbsolutePath('@storybook/addon-themes'),
        getAbsolutePath('@storybook/addon-links')
    ],
    framework: {
        name: getAbsolutePath('@storybook/angular'),
        options: {}
    },
    staticDirs: [
        './public'
    ],
    core: {
        disableTelemetry: true
    }
};

export default config;
