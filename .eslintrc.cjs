const { builtinModules } = require('node:module');
const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2021,
  },
  plugins: ['import', 'regexp', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:regexp/recommended',
    'plugin:react/recommended',
  ],
  rules: {
    eqeqeq: ['warn', 'always', { null: 'never' }],
    'no-process-exit': 'off',
    'no-useless-escape': 'off',
    'prefer-const': [
      'warn',
      {
        destructuring: 'all',
      },
    ],
    // ... other rules ...
    'import/no-nodejs-modules': [
      'error',
      { allow: builtinModules.map((mod) => `node:${mod}`) },
    ],
    'import/no-duplicates': 'error',
    'import/order': 'error',
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: false,
      },
    ],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
        ecmaVersion: 2021,
        sourceType: 'module',
      },
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/consistent-type-imports': 'warn',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
    {
      files: ['*.js', '*.jsx'],
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        'no-unused-vars': 'error',
      },
    },
    // ... other overrides ...
    {
      files: ['**/*'],
      excludedFiles: '**/__tests__/**',
      rules: {
        'no-restricted-globals': [
          'error',
          'require',
          '__dirname',
          '__filename',
        ],
      },
    },
    {
      files: ['./**'],
      rules: {
        'n/no-extraneous-import': 'off',
        'n/no-extraneous-require': 'off',
        'n/no-missing-import': 'off',
        'n/no-missing-require': 'off',
        // engine field doesn't exist in .s
        'n/no-unsupported-features/es-builtins': [
          'error',
          {
            version: '^14.18.0 || >=16.0.0',
          },
        ],
        'n/no-unsupported-features/node-builtins': [
          'error',
          {
            version: '^14.18.0 || >=16.0.0',
          },
        ],
        '@eslint/explicit-module-boundary-types': 'off',
      },
    },
    {
      files: ['./**'],
      excludedFiles: '**/__tests__/**',
      rules: {
        'no-undef': 'off',
        'no-empty': 'off',
        'no-constant-condition': 'off',
        '@eslint/no-empty-function': 'off',
      },
    },
    {
      files: ['**/*'],
      excludedFiles: [
        './ssr-resolve/**',
        './**/*{commonjs,cjs}*/**',
        './**/*{commonjs,cjs}*',
        './**/*dep*/**',
        './resolve/browser-module-field2/index.web.js',
        './resolve/browser-field/**',
        './tailwind/**', // blocked by https://github.com/postcss/postcss-load-config/issues/239
      ],
      rules: {
        'import/no-commonjs': 'error',
      },
    },
    {
      excludedFiles: '**/__tests__/**',
      rules: {
        '@eslint/ban-ts-comment': 'off',
      },
    },
    {
      files: ['*.js', '*.mjs', '*.cjs', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        'n/no-unsupported-features/es-syntax': [
          'error',
          {
            ignores: ['modules'],
          },
        ],
        'n/no-unsupported-features/node-builtins': [
          'error',
          {
            ignores: ['modules'],
          },
        ],
        '@eslint/explicit-module-boundary-types': 'off',
      },
    },
  ],
  reportUnusedDisableDirectives: true,
});
