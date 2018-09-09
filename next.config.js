/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const emoji = require('remark-emoji');
const withTM = require('@weco/next-plugin-transpile-modules');
const withMDX = require('@zeit/next-mdx')({
  extension: /.mdx?$/,
  options: {
    mdPlugins: [emoji]
  }
});

module.exports = withMDX(
  withTM({
    transpileModules: ['@sumup/circuit-ui'],
    pageExtensions: ['js', 'jsx', 'mdx', 'md'],
    poweredByHeader: false,
    webpack: (config, { dev }) => {
      const originalEntry = config.entry;
      // eslint-disable-next-line no-param-reassign
      config.entry = async () => {
        const entries = await originalEntry();
        if (entries['main.js']) {
          entries['main.js'].unshift('./scripts/polyfills.js');
        }
        return entries;
      };

      config.module.rules.push({
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
      });

      config.plugins.push(
        new webpack.DefinePlugin({
          __DEV__: JSON.stringify(dev),
          __PRODUCTION__: JSON.stringify(!dev),
          __TEST__: false
        })
      );

      if (process.env.ANALYZE) {
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerPort: 8888,
            openAnalyzer: true
          })
        );
      }

      return config;
    }
  })
);
