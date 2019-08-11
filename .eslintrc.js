const {
  react: baseConfig,
  overwritePresets
} = require('@sumup/foundry/eslint');

const customConfig = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'notice/notice': 'off',
    'emotion/jsx-import': 'off',
    'no-underscore-dangle': [
      'error',
      { allow: ['__resourcePath', '__DEV__', '__PRODUCTION__', '__TEST__'] }
    ]
  },
  globals: {
    __DEV__: true,
    __PRODUCTION__: true,
    __TEST__: true
  },
  overrides: [
    {
      files: ['services/*.js', 'components/**/*Service.js'],
      rules: {
        'import/prefer-default-export': 'off'
      }
    },
    {
      files: ['layouts/*.js'],
      rules: {
        'react/prop-types': 'off'
      }
    }
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            extensions: ['.js', '.jsx']
          }
        }
      }
    }
  }
};

module.exports = overwritePresets(baseConfig, customConfig);
