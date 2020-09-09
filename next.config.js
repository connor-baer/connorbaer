const webpack = require('webpack');
const remark = require('remark');
const mdx = require('remark-mdx');
const Slugger = require('github-slugger');
const slug = require('rehype-slug');
const emoji = require('remark-emoji');
const externalLinks = require('remark-external-links');
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer');
const withMdxEnhanced = require('next-mdx-enhanced');

const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: { deferScripts: true },
  env: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_PROJECT_ID: process.env.GOOGLE_PROJECT_ID,
    GOOGLE_AUTH_URI: process.env.GOOGLE_AUTH_URI,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    GOOGLE_TOKEN_URI: process.env.GOOGLE_TOKEN_URI,
    GOOGLE_AUTH_PROVIDER_X509_CERT_URL:
      process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  },
  webpack: (config, { dev, defaultLoaders }) => {
    // eslint-disable-next-line no-param-reassign
    config.node = {
      __filename: true,
      __dirname: true,
    };

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        defaultLoaders.babel,
        {
          loader: 'react-svg-loader',
          options: {
            es5: true,
          },
        },
      ],
    });

    config.plugins.push(
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(dev),
        __PRODUCTION__: JSON.stringify(!dev),
        __TEST__: false,
      }),
    );

    return config;
  },
  async headers() {
    return [
      {
        source: '/:all*',
        headers: [
          {
            key: 'X-Download-Options',
            value: 'noopen',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'no-referrer-when-downgrade',
          },
          {
            key: 'X-Xss-Protection',
            value: '1',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'Feature-Policy',
            value: "geolocation 'self'; microphone 'none'; camera 'none'",
          },
        ],
      },
    ];
  },
};

const bundleAnalyzerConfig = {
  enabled: process.env.ANALYZE === 'true',
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
  reExportDataFetching: true,
  remarkPlugins: [emoji, externalLinks],
  rehypePlugins: [slug],
  extendFrontMatter: {
    process: async (mdxContent) => {
      let tableOfContents;

      await remark()
        .use(mdx)
        .use(() => (tree) => {
          tableOfContents = toTOC(tree);
        })
        .process(mdxContent);

      return { tableOfContents };
    },
  },
};

module.exports = withPlugins(
  [withMdxEnhanced(mdxConfig), [withBundleAnalyzer, bundleAnalyzerConfig]],
  nextConfig,
);
