const webpack = require('webpack');
const remark = require('remark');
const mdx = require('remark-mdx');
const Slugger = require('github-slugger');
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

function getValues(node) {
  if (node.value) {
    return node.value;
  }
  return node.children.map(getValues);
}

const slugger = new Slugger();

function toTOC(tree) {
  return tree.children.reduce((allNodes, node) => {
    const { type, depth } = node;

    if (type !== 'heading' || depth > 2) {
      return allNodes;
    }

    const values = getValues(node);
    const value = values.join('');
    const id = slugger.slug(value, false).replace(/-\d+$/, '');

    allNodes.push({ value, id, depth });

    return allNodes;
  }, []);
}

const mdxConfig = {
  remarkPlugins: [emoji, externalLinks],
  rehypePlugins: [slug],
  extendFrontMatter: {
    process: async mdxContent => {
      let tableOfContents;

      await remark()
        .use(mdx)
        .use(() => tree => {
          tableOfContents = toTOC(tree);
        })
        .process(mdxContent);

      return { tableOfContents };
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
