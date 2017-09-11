module.exports = {
  extends: [
    'airbnb-base',
    'plugin:react/recommended',
    'prettier',
    'prettier/react'
  ],
  plugins: ['react', 'prettier'],
  rules: {
    'no-use-before-define': ['error', { functions: false }],
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
    'max-len': [
      'error',
      {
        code: 80,
        tabWidth: 2,
        ignoreComments: true,
        ignoreUrls: true
      }
    ],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true
      }
    ],
    'react/prop-types': [1, { ignore: ['i18n'] }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/prefer-default-export': 0
  },
  globals: {
    describe: true,
    beforeEach: true,
    inject: true,
    it: true,
    expect: true,
    afterEach: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    allowImportExportEverywhere: true,
    ecmaFeatures: {
      ecmaVersion: 2017,
      impliedStrict: true,
      jsx: true
    }
  },
  env: {
    browser: true
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.client.js'
      }
    }
  }
};
