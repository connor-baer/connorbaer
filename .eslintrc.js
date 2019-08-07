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
    'notice/notice': 'off'
  },
  globals: {
    __DEV__: true,
    __PRODUCTION__: true,
    __TEST__: true,
    objectFitPolyfill: true
  },
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
