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
      files: ['src/services/*.js', 'src/components/**/*Service.js'],
      rules: {
        'import/prefer-default-export': 'off'
      }
    },
    {
      files: ['src/layouts/*.js'],
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
