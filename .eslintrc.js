module.exports = require('@sumup/foundry/eslint')(
  {
    language: 'TypeScript',
    environments: ['Browser'],
    frameworks: ['React', 'Emotion', 'Jest'],
    openSource: false,
  },
  {
    rules: {
      'no-underscore-dangle': [
        'error',
        { allow: ['__resourcePath', '__DEV__', '__PRODUCTION__', '__TEST__'] },
      ],
    },
    overrides: [
      {
        files: ['layouts/*.js'],
        rules: {
          'react/prop-types': 'off',
        },
      },
    ],
  },
);
