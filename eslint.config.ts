import hug, { Files } from '@hug/eslint-config';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig(
    globalIgnores([
        'dist/',
        'tmp/',
        'out-tsc/',
        'bazel-out/',
        '**/npm-debug.log',
        '**/yarn-error.log',
        '**/.idea/',
        '**/.project',
        '**/.classpath',
        '**/.c9/',
        '**/*.launch',
        '**/.settings/',
        '.vscode/*',
        '!.vscode/settings.json',
        '!.vscode/tasks.json',
        '!.vscode/launch.json',
        '!.vscode/extensions.json',
        '.history/*',
        '.angular/cache/',
        '**/.sass-cache/',
        'connect.lock',
        'coverage/',
        'libpeerconnection.log',
        '**/testem.log',
        'typings/',
        '**/documentation.json',
        '**/*storybook.log',
        '**/.DS_Store',
        '**/Thumbs.db',
        '**/capacitor.config.ts',
        'android/',
        'ios/'
    ]),
    hug.configs.recommended,
    {
        rules: {
            'no-console': 'off'
        }
    },
    {
        files: ['**/tsconfig*.json'],
        rules: {
            'jsonc/no-comments': 'off'
        }
    },
    {
        files: Files.TYPESCRIPT,
        languageOptions: {
            parserOptions: {
                tsconfigRootDir: import.meta.dirname
            }
        },
        rules: {
            // Field initialization order and defensive checks are intentional in existing components.
            '@typescript-eslint/member-ordering': 'off',
            '@typescript-eslint/no-unnecessary-condition': 'off'
        }
    },
    {
        files: [
            'projects/core/src/directives/single-click.directive.ts',
            'projects/search-container/m2/search-container.component.ts',
            'projects/tooltip/m2/tooltip.directive.ts'
        ],
        rules: {
            '@angular-eslint/directive-selector': ['error', { type: 'attribute', style: 'kebab-case', prefix: 'ngx' }]
        }
    },
    {
        files: [
            'projects/layout/src/actions-group/action.directive.ts',
            'projects/splitter/m2/split-area.directive.ts'
        ],
        rules: {
            '@angular-eslint/directive-selector': ['error', { type: 'element', style: 'kebab-case', prefix: 'ngx' }]
        }
    },
    {
        files: ['projects/**/*.spec.ts'],
        languageOptions: {
            parserOptions: {
                projectService: false,
                project: ['./projects/*/tsconfig.spec.json']
            }
        }
    }
);
