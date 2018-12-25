/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack')
const slug = require('rehype-slug')
const emoji = require('remark-emoji')
const externalLinks = require('remark-external-links')
const withPlugins = require('next-compose-plugins')
const withOffline = require('next-offline')
const withOptimizedImages = require('next-optimized-images')
const withTranspileModules = require('@weco/next-plugin-transpile-modules')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const withMDX = require('@zeit/next-mdx')

const PORT = process.env.PORT || 8080
const LOCALHOST = `http://localhost:${PORT}`
const BASE_URL = process.env.BASE_URL || LOCALHOST
const STATIC_URL = process.env.STATIC_URL || `${LOCALHOST}/static`

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'md'],
  poweredByHeader: false,
  publicRuntimeConfig: { BASE_URL, STATIC_URL },
  webpack: (config, { dev }) => {
    const originalEntry = config.entry
    // eslint-disable-next-line no-param-reassign
    config.entry = async () => {
      const entries = await originalEntry()
      if (entries['main.js']) {
        entries['main.js'].unshift('./utils/polyfills.js')
      }
      return entries
    }

    // eslint-disable-next-line no-param-reassign
    config.node = {
      __filename: true,
      __dirname: true
    }

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
    })

    config.plugins.push(
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(dev),
        __PRODUCTION__: JSON.stringify(!dev),
        __TEST__: false
      })
    )

    return config
  },
  async exportPathMap(defaultPathMap, two, three) {
    console.log(444, defaultPathMap, two, three)
    // This will copy robots.txt from your project root into the out directory
    // await copyFile(join(dir, 'robots.txt'), join(outDir, 'robots.txt'));
    // TODO: Import from constants
    const categories = ['journal', 'opinion']
    const categoryPages = categories.reduce((allCategories, category) => {
      // eslint-disable-next-line no-param-reassign
      allCategories[`/blog/category/${category}`] = {
        page: '/blog/_category',
        query: { slug: category }
      }
      return allCategories
    }, {})
    const pathMap = {
      ...defaultPathMap,
      ...categoryPages
    }

    return pathMap
  }
}

const mdxConfig = {
  extension: /.mdx?$/,
  options: {
    mdPlugins: [emoji, externalLinks],
    hastPlugins: [slug]
  }
}

const optimizedImagesConfig = {
  handleImages: ['jpeg', 'png', 'webp', 'gif']
}

const transpileModulesConfig = {
  transpileModules: ['@sumup/circuit-ui']
}

const bundleAnalyzerConfig = {
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html'
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html'
    }
  }
}

module.exports = withPlugins(
  [
    withOffline,
    withMDX(mdxConfig),
    [withOptimizedImages, optimizedImagesConfig],
    [withTranspileModules, transpileModulesConfig],
    [withBundleAnalyzer, bundleAnalyzerConfig]
  ],
  nextConfig
)
