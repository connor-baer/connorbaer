module.exports = require('@sumup/foundry/eslint')(
  {
    language: 'TypeScript',
    environments: ['Browser'],
    frameworks: ['React', 'Emotion'],
    openSource: false,
  },
  {
    rules: {
      'no-underscore-dangle': ['error', { allow: ['__resourcePath'] }],
    },
    overrides: [
      {
        files: ['*'],
        rules: {
          'react/react-in-jsx-scope': 'off',
          '@typescript-eslint/no-unsafe-call': 'warn',
          '@typescript-eslint/no-unsafe-member-access': 'warn',
          '@typescript-eslint/no-unsafe-assignment': 'warn',
        },
      },
      {
        files: ['layouts/*.js'],
        rules: {
          'react/prop-types': 'off',
        },
      },
      {
        files: ['**/*.js'],
        rules: {
          '@typescript-eslint/explicit-module-boundary-types': 'off',
          '@typescript-eslint/restrict-template-expressions': 'off',
          '@typescript-eslint/no-unsafe-member-access': 'off',
          '@typescript-eslint/no-unsafe-assignment': 'off',
          '@typescript-eslint/no-unsafe-return': 'off',
          '@typescript-eslint/no-unsafe-call': 'off',
        },
      },
    ],
  },
);
