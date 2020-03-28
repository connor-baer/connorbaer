module.exports = require('@sumup/foundry/prettier')(
  {},
  {
    overrides: [
      {
        files: '*.mdx',
        options: {
          semi: false,
        },
      },
    ],
  },
);
