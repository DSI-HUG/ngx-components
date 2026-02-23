// This file has been automatically migrated to valid ESM format by Storybook.
import type { StorybookConfig } from '@storybook/angular';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
const getAbsolutePath = (value: string): string => dirname(require.resolve(join(value, 'package.json')));

// eslint-disable-next-line @typescript-eslint/naming-convention
import CopyWebpackPlugin from 'copy-webpack-plugin';

const filename = fileURLToPath(import.meta.url);
const dirName = dirname(filename);
const require = createRequire(import.meta.url);

const config: StorybookConfig = {
    stories: [
        './src/**/*.mdx',
        './src/**/*.stories.@(js|jsx|mjs|ts|tsx)'
    ],

    addons: [
        getAbsolutePath('@storybook/addon-themes'),
        getAbsolutePath('@storybook/addon-links'),
        getAbsolutePath('@storybook/addon-docs')
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
                    from: resolve(dirName, '../layout/m2/translations'),
                    to: 'translations/ngx-layout'
                },
                {
                    from: resolve(dirName, '../status/translations'),
                    to: 'translations/ngx-status'
                },
                {
                    from: resolve(dirName, '../user-card/m2/translations'),
                    to: 'translations/ngx-user-card'
                },
                {
                    from: resolve(dirName, '../search-container/m2/translations'),
                    to: 'translations/ngx-search-container'
                },
                {
                    from: resolve(dirName, '../message-box-dialog/m2/translations'),
                    to: 'translations/ngx-message-box-dialog'
                }
            ]
        });
        webpackConfig.plugins.push(pluginAssetsTranslation);

        return webpackConfig;
    },

    core: {
        disableTelemetry: true
    },

    features: {
        actions: false
    }
};

export default config;
