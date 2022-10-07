module.exports = {
  root: true,
  env: {
    node: true,
    browser: false,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  extends: ['eslint:recommended', 'prettier'],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
    ],
    'no-duplicate-imports': 'off',
    'no-irregular-whitespace': 'off',
    'no-useless-escape': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-async-promise-executor': 'error',
    'prettier/prettier': 'error',
    'import/no-extraneous-dependencies': 'warn',
    'import/no-default-export': 'warn',
    'import/order': [
      'warn',
      {
        pathGroups: [
          {
            pattern: '*.{png,jpg,jpeg,gif,svg,webp}',
            patternOptions: { matchBase: true },
            group: 'index',
            position: 'after',
          },
        ],
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'ignore',
      },
    ],
    eqeqeq: 'error',
  },
  overrides: [
    {
      files: ['*.{ts}'],
      plugins: ['@typescript-eslint'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        tsconfigRootDir: process.cwd(),
        project: './tsconfig.json',
      },
      extends: ['plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/recommended-requiring-type-checking'],
      rules: {
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/prefer-namespace-keyword': 'off',
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/restrict-template-expressions': 'warn',
        '@typescript-eslint/array-type': [
          'warn',
          {
            default: 'array',
          },
        ],
        '@typescript-eslint/explicit-module-boundary-types': 'error',
        '@typescript-eslint/switch-exhaustiveness-check': 'warn',
        '@typescript-eslint/restrict-plus-operands': 'warn',
        '@typescript-eslint/no-duplicate-imports': 'warn',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/prefer-ts-expect-error': 'error',
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/ban-ts-comment': [
          'error',
          {
            'ts-expect-error': false,
            'ts-nocheck': 'allow-with-description',
          },
        ],
        // By default, these are banned: String, Boolean, Number, Object, Symbol
        '@typescript-eslint/ban-types': [
          'error',
          {
            types: {
              object: false,
              '{}': false,
            },
          },
        ],
        '@typescript-eslint/consistent-type-assertions': 'error',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/consistent-type-imports': [
          'error',
          {
            prefer: 'type-imports',
          },
        ],
        '@typescript-eslint/no-empty-function': 'error',
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/no-for-in-array': 'error',

        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-use-before-define': 'error',
      },
    },
  ],
};
