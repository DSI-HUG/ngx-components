import hug, { Files } from '@hug/eslint-config';
import { defineConfig } from 'eslint/config';

export default defineConfig(
    // Will customize predefined configs
    hug.configs.createRecommended({
        typescript: {
            rules: {
                'no-console': 'off',
                '@typescript-eslint/member-ordering': 'off',
                // Defensive checks are kept on purpose: public APIs may receive nullish values at runtime
                '@typescript-eslint/no-unnecessary-condition': 'off',
                // MatDialogConfig is a class but is always provided as a plain object literal
                '@typescript-eslint/no-misused-spread': ['error', { allow: [{ from: 'package', package: '@angular/material', name: 'MatDialogConfig' }] }],
            },
        },
        angular: {
            ts: {
                rules: {
                    // Renaming selectors or outputs would be a breaking change for library consumers
                    '@angular-eslint/directive-selector': 'off',
                    '@angular-eslint/no-output-native': 'off',
                },
            },
        },
        json: {
            rules: {
                'jsonc/no-comments': 'off',
            },
        },
    }),
    hug.configs.stylistic.recommended, // Formatter

    // Resolve tsconfig files from the workspace root, even when eslint is run from a sub-project
    {
        name: 'ngx-components/typescript/parser-options',
        files: Files.TYPESCRIPT,
        languageOptions: {
            parserOptions: {
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
);
