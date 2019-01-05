const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');

const config = {
  target: 'node',
  optimization: {
    nodeEnv: false
  },
  node: {
    __dirname: false,
    __filename: false
  },
  entry: './server/app.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js'
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['latest-node', { target: '10', modules: false }]]
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    })
  ],
  devtool: 'sourcemap'
};

module.exports = env => {
  config.plugins.push(
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(env !== 'production'),
      __PRODUCTION__: JSON.stringify(env === 'production'),
      __TEST__: false
    })
  );

  if (env === 'develop') {
    config.mode = 'development';
    config.watch = true;
    config.plugins.push(
      new NodemonPlugin({
        nodeArgs: ['--inspect']
      })
    );
  }

  if (env === 'production') {
    config.mode = 'production';
    config.watch = false;
  }

  if (process.env.ANALYZE) {
    // eslint-disable-next-line global-require
    const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: 8889,
        openAnalyzer: true
      })
    );
  }

  return config;
};
