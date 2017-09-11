/**
 * WEBPACK CONFIGURATION
 */

const pkg = require('./package.json'), // Allows access to the project metadata from the package.json file.
  webpack = require('webpack'),
  path = require('path'),
  src = pkg.config.src, // The raw material of the theme: custom scripts, SCSS source files, images, etc.; do not delete this folder!
  root = pkg.config.root, // The webroot directory that will be accessible on your server.
  dev = pkg.config.dev, // A folder for your assets in development.
  dist = pkg.config.dist, // A folder for your assets in production.
  tmplts = pkg.config.tmplts, // The CraftCMS template folder.
  modules = pkg.config.modules; // NPM packages.

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    single: src + 'js/single.js',
    collection: src + 'js/collection.js'
  },
  output: {
    path: path.resolve(dev + 'js/'),
    filename: '[name].min.js',
    publicPath: '/dist/js/'
  },
  plugins: [
    new webpack.DefinePlugin({
      // <-- key to reducing React's size
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(), // Minify everything
    new webpack.optimize.AggressiveMergingPlugin() // Merge chunks
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};
