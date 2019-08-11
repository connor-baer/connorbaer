const webpack = require('webpack');
const slug = require('rehype-slug');
const emoji = require('remark-emoji');
const externalLinks = require('remark-external-links');
const withPlugins = require('next-compose-plugins');
const withOffline = require('next-offline');
// const withTranspileModules = require('next-transpile-modules');
const withBundleAnalyzer = require('@next/bundle-analyzer');
const withMdxEnhanced = require('next-mdx-enhanced');

const nextConfig = {
  poweredByHeader: false,
  webpack: (config, { dev, defaultLoaders }) => {
    // eslint-disable-next-line no-param-reassign
    // config.resolve.alias = {
    //   ...config.resolve.alias,
    //   '@madebyconnor/bamboo-ui': require.resolve(
    //     '@madebyconnor/bamboo-ui/lib/es'
    //   )
    // };

    // eslint-disable-next-line no-param-reassign
    config.node = {
      __filename: true,
      __dirname: true
    };

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        defaultLoaders.babel,
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

    return config;
  }
};

const bundleAnalyzerConfig = {
  enabled: process.env.ANALYZE === 'true'
};

const mdxConfig = {
  remarkPlugins: [emoji, externalLinks],
  rehypePlugins: [slug]
};

module.exports = withPlugins(
  [
    withOffline,
    withMdxEnhanced(mdxConfig),
    [withBundleAnalyzer, bundleAnalyzerConfig]
  ],
  nextConfig
);
