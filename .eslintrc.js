const baseConfig = require('@sumup/foundry/eslint').react;

const config = {
  ...baseConfig,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  globals: {
    __DEV__: true,
    __PRODUCTION__: true,
    __TEST__: true,
    objectFitPolyfill: true
  }
};

module.exports = config;
