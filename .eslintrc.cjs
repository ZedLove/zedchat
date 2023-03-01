module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:svelte/recommended',
  ],
  rules: {
    'comma-dangle': 'off',
    'comma-style': ['warn', 'last'],
    'indent': ['warn', 2],
    'max-len': ['warn', 120],
    'max-lines': ['warn', 500],
    'max-statements-per-line': 'error',
    'new-cap': 'error',
    'no-extra-parens': 'error',
    'no-trailing-spaces': 'error',
    'quotes': 'off',
    'semi': 'off',
    '@typescript-eslint/comma-dangle': ['warn', 'always-multiline'],
    '@typescript-eslint/semi': ['warn', 'always'],
    '@typescript-eslint/quotes': ['error', 'single'],
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    extraFileExtensions: ['.svelte']
  },
  env: {
    es6: true,
    browser: true
  },
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
  ],
  plugins: ['@typescript-eslint'],
  ignorePatterns: [
    'node_modules',
    '.eslintrc.cjs',
    'pb_migrations',
    'svelte.config.js',
    'vite.config.ts',
    'dist',
  ],
};
