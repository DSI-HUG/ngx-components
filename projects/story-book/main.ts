import type { StorybookConfig } from '@storybook/angular';
import { dirname, join, resolve } from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
const getAbsolutePath = (value: string): string => dirname(require.resolve(join(value, 'package.json')));

// eslint-disable-next-line @typescript-eslint/naming-convention
import CopyWebpackPlugin from 'copy-webpack-plugin';

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
    webpackFinal: webpackConfig => {
        webpackConfig.performance = (typeof webpackConfig.performance === 'object') ? webpackConfig.performance : {};
        webpackConfig.performance.hints = false;
        webpackConfig.performance.maxEntrypointSize = 512000;
        webpackConfig.performance.maxAssetSize = 512000;

        webpackConfig.plugins = webpackConfig?.plugins ?? [];
        const pluginAssetsTranslation = new CopyWebpackPlugin({
            patterns: [
                {
                    from: resolve(__dirname, '../layout/public/translations'),
                    to: 'public/translations/ngx-layout'
                },
                {
                    from: resolve(__dirname, '../status/public/translations'),
                    to: 'public/translations/ngx-status'
                }
            ]
        });
        webpackConfig.plugins.push(pluginAssetsTranslation);

        return webpackConfig;
    },
    core: {
        disableTelemetry: true
    }
};

export default config;
