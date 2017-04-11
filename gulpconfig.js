// ==== GULP CONFIGURATION ==== //

// Variables
// BrowserSync
// Watch
// Update
// Clean
// Styles
// Scripts
// Icons
// Revisions
// Service Worker


// Variables //

const pkg   = require('./package.json'), // Allows access to the project metadata from the package.json file.
  src     = 'source/', // The raw material of the theme: custom scripts, SCSS source files, images, etc.; do not delete this folder!
  dist    = 'public/', // The webroot directory that will be accessible on your server.
  assets  = 'assets/', // A folder for your assets in the source and/or distribution directory.
  tmplts  = 'templates/', // The CraftCMS template folder.
  bower   = 'bower_components/', // Bower packages.
  modules = 'node_modules/' // NPM packages.
;

module.exports = {


  // BrowserSync

  browsersync: {
    files: [dist + assets + '**/*', tmplts + '**/*'],
    port: 5000, // Port number for the live version of the site.
    proxy: 'http://' + pkg.name + '.dev/', // We need to use a proxy instead of the built-in server because CraftCMS has to do some server-side rendering for the website to work.
    notify: false, // In-line notifications (the blocks of text saying whether you are connected to the BrowserSync server or not)
    ui: false, // Set to false if you don't need the browsersync UI
    open: false, // Set to false if you don't like the browser window opening automatically
    reloadDelay: 1000, // Time, in milliseconds, to wait before reloading/injecting
    watchOptions: {
      debounceDelay: 4000, // This introduces a small delay when watching for file change events to avoid triggering too many reloads
    },
  },


  // Watch //

  watch: {
    styles:  [src + 'css/**/*.scss'],
    scripts: src + 'js/*.js',
  },


  // Update  //

  update: {
    // Copies dependencies from package managers to `_scss` and renames them to allow for them to be imported as a Sass file.
    styles: {
      src: [
        modules + 'normalize.css/normalize.css',
        modules + 'open-color/open-color.scss',
        modules + 'choices.js/assets/styles/scss/choices.scss',
        modules + 'photoswipe/dist/photoswipe.css',
      ],
      rename: {
        prefix: '_',
        extname: '.scss',
      },
      dest: src + 'css/dependencies/',
    },
  },


  // Clean //

  clean: {
    tidy: [dist + '**/.DS_Store', dist + assets + 'revisions.json', tmplts + '**/*.min.css', dist + 'tmp-*'], // A glob pattern matching junk files to clean out of `build`; feel free to add to this array.
    css: [dist + assets + 'css/'], // Clean this out before creating a new distribution copy.
    js: [dist + assets + 'js/'], // Clean this out before creating a new distribution copy.
  },


  // Styles //

  styles: {
    src:  src + '**/**/*.scss',
    dest: dist + assets,
    libsass: { // Requires the libsass implementation of Sass (included in this package)
      includePaths: [bower, modules, src + 'css/'], // Adds Bower and npm directories to the load path so you can @import directly
      precision: 6,
      onError: function (err) {
        return console.log(err);
      },
    },
    minify: {
      cssnano: {
        autoprefixer: {
          add: true,
          browsers: ['> 3%', 'last 2 versions'], // This tool is magic and you should use it in all your projects :)
        },
      },
      rename: {
        extname: '.min.css',
      },
    },
    critical: {
      src: 'http://' + pkg.name + '.dev/',
      dest: '../' + tmplts,
      small: {
        height: 732,
        width: 412,
      },
      large: {
        height: 1280,
        width: 1280,
      },
      base: dist,
      css: dist + assets + 'css/styles.min.css',
      files: [
        { url: '', template: 'index' },
        { url: 'work', template: 'work/index' },
        { url: 'work/side-project/jekyll-themes', template: 'work/_entry' },
        { url: 'blog', template: 'blog/index' },
        { url: 'blog/africa-is-not-a-country', template: 'blog/_entry' },
        { url: 'legal', template: '_pages/entry' },
      ],
    },
    amp: {
      src:  dist + assets + 'css/amp.min.css',
      dest: tmplts + '_layouts/',
    },
  },


  // Scripts //

  scripts: {
    src: {
      bundles: {
        scripts: [
          modules + 'lazysizes/lazysizes.js',
          modules + 'fontfaceobserver/fontfaceobserver.js',
          modules + 'object-fit-images/dist/ofi.js',
          modules + 'headroom.js/dist/headroom.js',
          modules + 'suncalc/suncalc.js',
          src + 'js/alertify.js',
          src + 'js/polyfills.js',
          src + 'js/scripts.js',
        ],
        vue: [
          modules + 'vue/dist/vue.js',
          src + 'js/vue.js',
        ],
        prism: [
          modules + 'prismjs/prism.js',
          modules + 'prismjs/components/prism-json.js',
          modules + 'prismjs/components/prism-markdown.js',
          modules + 'prismjs/components/prism-python.js',
          modules + 'prismjs/components/prism-php.js',
          modules + 'prismjs/components/prism-scss.js',
          modules + 'prismjs/components/prism-twig.js',
        ],
        photoswipe: [
          modules + 'photoswipe/dist/photoswipe.js',
          src + 'js/photoswipe.js',
        ],
        choices: [
          modules + 'choices.js/assets/scripts/dist/choices.min.js',
        ],
        quill: [
          modules + 'quill/dist/quill.js',
          src + 'js/quill.js',
        ],
      },
      inline: [
        modules + 'fg-loadcss/src/loadCSS.js',
        modules + 'fg-loadcss/src/cssrelpreload.js',
        modules + 'loadjs/dist/loadjs.js',
      ],
    },
    minify: {
      uglify: {}, // Default options.
      rename: {
        extname: '.min.js',
      },
    },
    combined: 'combined.js',
    dest: dist + assets + 'js/',
    destInline: tmplts + '_inline/',
  },


  // Icons //

  icons: {
    src: src + 'favicons/*(*.png|*.jpg|*.jpeg)',
    favicons: {
      appName: 'Connor Bär',
      appDescription: pkg.description,
      developerName: pkg.author,
      background: '#ffffff',
      theme_color: '#000000',
      path: '/favicons/',
      url: pkg.homepage,
      display: 'standalone',
      orientation: 'portrait',
      start_url: '/?utm_source=web_app_manifest',
      version: pkg.version,
      logging: false,
      online: false,
      replace: true,
      html: tmplts + '_includes/icons.html',
      pipeHTML: true,
      icons: {
        coast: { offset: 15 }, // Create Opera Coast icon with offset 15%. `boolean` or `{ offset: offsetInPercentage }`
        yandex: false,         // Create Yandex browser icon. `boolean`
      },
    },
    destHtml: '',
    dest: dist + 'favicons/',
  },


  // Revisions //

  revisions: {
    css: dist + assets + '**/*.css',
    js: dist + assets + '**/*.js',
    dest: dist + assets,
    manifest: 'revisions.json',
    options: {
      base: dist + assets,
      merge: true,
    },
  },


  // Service Worker //

  serviceWorker: {
    root:    dist,
    name:    'service-worker.js',
    config: {
      cacheId: pkg.name,
      importScripts: ['sw.js'],
      /*
      dynamicUrlToDependencies: {
        'dynamic/page1': [
          path.join(rootDir, 'views', 'layout.jade'),
          path.join(rootDir, 'views', 'page1.jade')
        ],
        'dynamic/page2': [
          path.join(rootDir, 'views', 'layout.jade'),
          path.join(rootDir, 'views', 'page2.jade')
        ]
      },
      */
      runtimeCaching: [{
        // See https://github.com/GoogleChrome/sw-toolbox#methods
        urlPattern: /runtime-caching/,
        handler: 'cacheFirst',
        // See https://github.com/GoogleChrome/sw-toolbox#options
        options: {
          cache: {
            maxEntries: 1,
            name: 'runtime-cache',
          },
        },
      },],
      staticFileGlobs: [
        dist + assets + '/css/**.css',
        dist + assets + '/js/**.js',
      ],
      stripPrefix: dist,
      // verbose defaults to false, but for the purposes of this demo, log more.
      verbose: true,
    },
  },
};
