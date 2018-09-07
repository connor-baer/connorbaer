const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

module.exports = function(storybookBaseConfig, configType) {
  const isProduction = configType === 'PRODUCTION';
  const ourConfig = {
    externals: {
      jsdom: 'window',
      cheerio: 'window',
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': 'window',
      'react/addons': true
    },
    module: {
      rules: [
        {
          test: /\.story\.jsx?$/,
          loaders: [
            'babel-loader',
            {
              loader: require.resolve('@storybook/addon-storysource/loader'),
              options: {
                prettierConfig: {
                  parser: 'babylon'
                }
              }
            }
          ],
          enforce: 'pre'
        },
        {
          test: /\.svg$/,
          use: [
            { loader: 'babel-loader' },
            {
              loader: 'react-svg-loader',
              options: {
                es5: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        STORYBOOK: JSON.stringify(true),
        PRODUCTION: JSON.stringify(isProduction),
        __DEV__: true,
        __PRODUCTION__: false,
        __TEST__: false
      })
    ]
  };

  return merge(storybookBaseConfig, ourConfig);
};
