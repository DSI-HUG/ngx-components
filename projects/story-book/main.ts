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
                    from: resolve(__dirname, '../layout/translations'),
                    to: 'translations/ngx-layout'
                },
                {
                    from: resolve(__dirname, '../status/translations'),
                    to: 'translations/ngx-status'
                },
                {
                    from: resolve(__dirname, '../user-card/translations'),
                    to: 'translations/ngx-user-card'
                },
                {
                    from: resolve(__dirname, '../search-container/translations'),
                    to: 'translations/ngx-search-container'
                },
                {
                    from: resolve(__dirname, '../message-box-dialog/translations'),
                    to: 'translations/ngx-message-box-dialog'
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
