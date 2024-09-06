const {
    schematic, spawn, replaceInFile, workspace, modifyJsonFile, library, createOrUpdateFile, runAtEnd
} = require('@hug/ngx-schematics-utilities');
const { noop } = require('@angular-devkit/schematics');

exports.default = options =>
    schematic('new-package', [
        spawn('ng', ['g', 'library', options.libName]),

        workspace()
            // deploy files
            .deployFiles({
                libName: options.libName.toLowerCase(),
                ciName: `_${options.libName.toLowerCase()}`
            }, 'files/workspace')

            // modify ci_release.yml
            .rule(({ tree }) => {
                const file = tree.readText('.github/workflows/ci_release.yml');
                if (!file.includes(`- ${options.libName.toLowerCase()}`)) {
                    return replaceInFile(
                        '.github/workflows/ci_release.yml',
                        'dry-run:',
                        `${' '.repeat(4)}- ${options.libName.toLowerCase()}\n${' '.repeat(6)}dry-run:`
                    );
                }
                return noop();
            })

            // modify tsconfig.json
            .rule(({ tree }) => {
                const paths = tree.readJson('tsconfig.json').compilerOptions.paths;
                paths[`@hug/ngx-${options.libName.toLowerCase()}`] = [
                    `projects/${options.libName.toLowerCase()}/src`
                ];
                const sortedPaths = Object.fromEntries(Object.entries(paths).sort());
                return modifyJsonFile('tsconfig.json', ['compilerOptions', 'paths'], sortedPaths);
            })

            // modify tsconfig.base.json
            .rule(({ tree }) => {
                const paths = tree.readJson('tsconfig.base.json').compilerOptions.paths;
                paths[`@hug/ngx-${options.libName.toLowerCase()}`] = [
                    `dist/ngx-${options.libName.toLowerCase()}`
                ];
                const sortedPaths = Object.fromEntries(Object.entries(paths).sort());
                return modifyJsonFile('tsconfig.base.json', ['compilerOptions', 'paths'], sortedPaths);
            })

            // modify package.json
            .rule(({ tree }) => {
                const workspaces = tree.readJson('package.json').workspaces;
                const value = `projects/${options.libName.toLowerCase()}`;
                if (!workspaces.includes(value)) {
                    workspaces.push(value);
                    workspaces.sort();
                    return modifyJsonFile('package.json', ['workspaces'], workspaces);
                }
                return noop();
            })

            // modify README.md
            .rule(({ tree }) => {
                const libName = options.libName.toLowerCase();
                let content = tree.readText('README.md');
                if (!content.includes(libName)) {
                    const toReplace = '\n</div>\n\n<hr/>\n\n## Getting started';
                    content = content.replace(
                        toReplace,
                        `[@hug/ngx-${libName}](/projects/${libName}) | [![npm version][npm-logo-${libName}]][npm-${libName}] | [![npm downloads][npm-dl-logo-${libName}]][npm-dl-${libName}] | [![build status][tests-logo-${libName}]][tests-${libName}]\n${toReplace}`
                    );
                    content = `${content}\n` +
                        `[npm-${libName}]: https://www.npmjs.com/package/@hug/ngx-${libName}\n` +
                        `[npm-logo-${libName}]: https://img.shields.io/npm/v/@hug/ngx-${libName}.svg?color=blue&logo=npm\n` +
                        `[npm-dl-${libName}]: https://npmcharts.com/compare/@hug/ngx-${libName}?minimal=true\n` +
                        `[npm-dl-logo-${libName}]: https://img.shields.io/npm/dw/@hug/ngx-${libName}.svg?color=7986CB&logo=npm&label=npm\n` +
                        `[tests-${libName}]: https://github.com/dsi-hug/ngx-components/actions/workflows/ci_test_${libName}.yml\n` +
                        `[tests-logo-${libName}]: https://github.com/dsi-hug/ngx-components/actions/workflows/ci_test_${libName}.yml/badge.svg\n`;
                    return createOrUpdateFile('README.md', content);
                }
                return noop();
            })

            .toRule(),

        library(options.libName)
            // deploy files
            .deployFiles({
                libName: options.libName.toLowerCase()
            }, 'files/project')

            // modify tsconfig.lib.json
            .modifyJsonFile('tsconfig.lib.json', ['extends'], '../../tsconfig.base.json')

            // rename `public-api.ts` to `index.ts`
            .renameFile('__SRC__/public-api.ts', '__SRC__/index.ts')

            // update `index.ts`
            .createOrUpdateFile('__SRC__/index.ts', '')

            // delete `lib` folder
            .deleteFiles(['__SRC__/lib'], true)

            .toRule(),

        // Update `package-lock.json`
        runAtEnd(spawn('npm', ['install']))

    ], options);
