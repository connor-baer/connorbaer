const baseConfig = require('@sumup/foundry/eslint').react;

const config = {
  ...baseConfig,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  }
};

module.exports = config;
