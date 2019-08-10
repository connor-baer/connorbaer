const webpack = require('webpack');
const slug = require('rehype-slug');
const emoji = require('remark-emoji');
const externalLinks = require('remark-external-links');
const withPlugins = require('next-compose-plugins');
const withOffline = require('next-offline');
const withOptimizedImages = require('next-optimized-images');
const withTranspileModules = require('next-transpile-modules');
const withBundleAnalyzer = require('@next/bundle-analyzer');
const withMdxEnhanced = require('next-mdx-enhanced');

const PORT = process.env.PORT || 8080;
const LOCALHOST = `http://localhost:${PORT}`;
const BASE_URL = process.env.BASE_URL || LOCALHOST;
const STATIC_URL = process.env.STATIC_URL || `${LOCALHOST}/static`;

const nextConfig = {
  poweredByHeader: false,
  publicRuntimeConfig: {
    BASE_URL,
    STATIC_URL
  },
  webpack: (config, { dev, defaultLoaders }) => {
    // eslint-disable-next-line no-param-reassign
    config.resolve.alias = {
      ...config.resolve.alias,
      '@sumup/circuit-ui': require.resolve('@sumup/circuit-ui/lib/es'),
      '@madebyconnor/bamboo-ui': require.resolve(
        '@madebyconnor/bamboo-ui/lib/es'
      )
    };

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

const mdxConfig = {
  remarkPlugins: [emoji, externalLinks],
  rehypePlugins: [slug]
};

const optimizedImagesConfig = {
  handleImages: ['jpeg', 'png', 'webp', 'gif']
};

const transpileModulesConfig = {
  transpileModules: ['@sumup/circuit-ui', '@madebyconnor/bamboo-ui']
};

const bundleAnalyzerConfig = {
  enabled: process.env.ANALYZE === 'true'
};

module.exports = withPlugins(
  [
    withOffline,
    [withOptimizedImages, optimizedImagesConfig],
    [withTranspileModules, transpileModulesConfig],
    [withBundleAnalyzer, bundleAnalyzerConfig],
    withMdxEnhanced(mdxConfig)
  ],
  nextConfig
);
