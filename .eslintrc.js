/** @type {import('@typescript-eslint/experimental-utils').TSESLint.Linter.Config} */
module.exports = {
    env: {
        browser: true,
        es2020: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb/hooks',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:prettier/recommended',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2020,
        project: './tsconfig.eslint.json',
        sourceType: 'module',
        tsconfigRootDir: __dirname,
    },
    plugins: [
        '@typescript-eslint',
        'import',
        'unused-imports',
        'jsx-a11y',
        'prefer-arrow',
        'prettier',
        'react',
        'react-hooks',
    ],
    root: true,
    rules: {
        'lines-between-class-members': [
            'error',
            'always',
            {
                exceptAfterSingleLine: true,
            },
        ],
        // should be rewritten as `['error', { allowAsStatement: true }]` in ESLint 7 or later
        // SEE: https://github.com/typescript-eslint/typescript-eslint/issues/1184
        'no-void': 'off',
        'padding-line-between-statements': [
            'error',
            {
                blankLine: 'always',
                prev: '*',
                next: 'return',
            },
        ],
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                'vars': 'all',
                'args': 'after-used',
                'argsIgnorePattern': '_',
                'ignoreRestSiblings': false,
                'varsIgnorePattern': '_',
            },
        ],
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
        'prefer-arrow/prefer-arrow-functions': [
            'error',
            {
                disallowPrototype: true,
                singleReturnOnly: false,
                classPropertiesAllowed: false,
            },
        ],
        'react/jsx-filename-extension': [
            'error',
            {
                extensions: ['.jsx', '.tsx'],
            },
        ],
        'react/jsx-props-no-spreading': [
            'error',
            {
                html: 'enforce',
                custom: 'enforce',
                explicitSpread: 'ignore',
            },
        ],
        'unused-imports/no-unused-imports-ts': 'warn',
        'sort-imports': 0,
        'import/order': [
            2,
            {
                'alphabetize': {
                    'order': 'asc'
                }
            }
        ],
        'react/display-name': 0,
        'react/react-in-jsx-scope': 0,
        '@typescript-eslint/no-unsafe-assignment': 0,
        '@typescript-eslint/no-unsafe-member-access': 0,
        '@typescript-eslint/no-unsafe-return': 0,
        '@typescript-eslint/no-unsafe-call': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/unbound-method': 0,
        '@typescript-eslint/restrict-template-expressions': 0,
        'react/jsx-props-no-spreading': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-floating-promises': 0,
        '@typescript-eslint/ban-ts-comment': 0,
        '@typescript-eslint/no-unused-vars': 'warn'
    },
    overrides: [
        {
            'files': ['*.tsx'],
            'rules': {
                'react/prop-types': 'off',
            },
        },
    ],
    settings: {
        'import/resolver': {
            node: {
                paths: ['src'],
            },
        }
    },
};
