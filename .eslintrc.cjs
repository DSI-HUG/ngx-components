module.exports = {
    root: true,
    extends: [
        '@hug/eslint-config/recommended'
    ],
    rules: {
        'no-console': 0
    },
    overrides: [
        {
            files: 'projects/**/*.spec.ts',
            parserOptions: {
                projectService: false,
                project: [
                    './projects/*/tsconfig.spec.json'
                ],
                tsconfigRootDir: __dirname
            }
        }
    ]
};
