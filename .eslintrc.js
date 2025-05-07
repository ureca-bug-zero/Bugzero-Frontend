module.exports = {
  extends: [
    'plugin:prettier/recommended',
    'react-app',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['react', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE'],
        filter: {
          regex: 'List$',
          match: true,
        },
      },
      {
        selector: 'variable',
        types: ['boolean'],
        format: ['camelCase'],
        prefix: ['is'],
      },
      {
        selector: 'function',
        format: ['camelCase'],
      },
      {
        selector: 'function',
        types: ['boolean'],
        format: ['camelCase'],
        prefix: ['is'],
      },
      {
        selector: 'interface',
        format: ['PascalCase'],
      },
      {
        selector: 'typeAlias',
        format: ['PascalCase'],
      },
      {
        selector: 'class',
        format: ['PascalCase'],
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
  },
};
