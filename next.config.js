const webpack = require('webpack');
const remark = require('remark');
const mdx = require('remark-mdx');
const slug = require('rehype-slug');
const emoji = require('remark-emoji');
const externalLinks = require('remark-external-links');
const withPlugins = require('next-compose-plugins');
const withOffline = require('next-offline');
const withBundleAnalyzer = require('@next/bundle-analyzer');
const withMdxEnhanced = require('next-mdx-enhanced');

const nextConfig = {
  poweredByHeader: false,
  webpack: (config, { dev, defaultLoaders }) => {
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
  rehypePlugins: [slug],
  extendFrontMatter: {
    process: async mdxContent => {
      const contents = await remark()
        .use(mdx)
        .use(() => tree => {
          console.log(tree);
          const headings = tree.children.filter(
            node => node.type === 'heading'
          );
          console.log(headings);
          return tree;
          // try {
          //   return tree.children.filter(node => node.type === 'heading');
          // } catch (e) {
          //   console.error(e);
          //   return tree;
          // }
        })
        .process(mdxContent);
      return { contents };
    }
  }
};

module.exports = withPlugins(
  [
    withOffline,
    withMdxEnhanced(mdxConfig),
    [withBundleAnalyzer, bundleAnalyzerConfig]
  ],
  nextConfig
);
