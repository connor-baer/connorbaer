const baseConfig = require('@sumup/foundry/prettier').base;

const config = {
  ...baseConfig,
  overrides: [
    {
      files: '*.mdx',
      options: {
        semi: false
      }
    }
  ]
};

module.exports = config;
