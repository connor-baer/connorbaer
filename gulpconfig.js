/**
 * GULP CONFIGURATION
 *
 * Clean
 * Styles
 * Scripts
 * BrowserSync
 * Watch
 * Revisions
 * Service Worker
 * Favicons
 */


const pkg = require( './package.json' ), // Allows access to the project metadata from the package.json file.
  src = 'source/', // The raw material of the theme: custom scripts, SCSS source files, images, etc.; do not delete this folder!
  root = 'public/', // The webroot directory that will be accessible on your server.
  dev = root + 'dev/', // A folder for your assets in development.
  dist = root + 'dist/', // A folder for your assets in production.
  tmplts = 'templates/', // The CraftCMS template folder.
  modules = 'node_modules/' // NPM packages.
;


module.exports = {


  // Clean //

  clean: {
    tidy: [ root + '**/.DS_Store' ], // A glob pattern matching junk files to clean out of the webroot.
    dev: [ root + 'revisions.json', dev + '*' ], // Clean the development directory for a fresh build.
    dist: [ dist + '*', tmplts + '**/*.min.css' ], // Clean the distribution directory for a fresh build.
  },


  // Styles //

  styles: {
    update: {
      // Copies dependencies from package managers to the 'source' directory and renames them to allow for them to be imported as a SCSS partial.
      src: [
        modules + 'normalize.css/normalize.css',
        modules + 'open-color/open-color.scss',
        modules + 'choices.js/assets/styles/scss/choices.scss',
        modules + 'simplemde/dist/simplemde.min.css',
        modules + 'photoswipe/dist/photoswipe.css',
      ],
      rename: {
        prefix: '_',
        extname: '.scss',
      },
      dest: src + 'css/lib/',
    },
    compile: {
      src: src + '**/**/*.scss',
      dest: dev,
      libsass: { // Requires the libsass implementation of Sass (included in this package)
        precision: 6,
        onError: function ( err ) {
          return console.log( err );
        },
      },
      cssnano: {
        zindex: false,
        autoprefixer: {
          add: true,
          browsers: [ '> 3%', 'last 2 versions' ], // This tool is magic and you should use it in all your projects :)
        },
      },
      rename: {
        extname: '.min.css',
      },
    },
    amp: {
      src: dev + 'css/amp.min.css',
      dest: tmplts + '_layouts/',
    },
    critical: {
      src: pkg.homepage,
      dest: '../' + tmplts,
      small: {
        height: 732,
        width: 412,
      },
      large: {
        height: 1280,
        width: 1280,
      },
      base: root,
      css: dev + 'css/styles.min.css',
      files: [
        {
          url: '',
          template: 'index'
        },
        {
          url: 'home',
          template: 'home'
        },
        {
          url: 'work',
          template: 'work/index'
        },
        {
          url: 'work/side-project/jekyll-themes',
          template: 'work/_entry'
        },
        {
          url: 'blog',
          template: 'blog/index'
        },
        {
          url: 'blog/africa-is-not-a-country',
          template: 'blog/_entry'
        },
        {
          url: 'legal',
          template: '_pages/entry'
        },
      ],
    },
  },


  // Scripts //

  scripts: {
    bundles: {
      src: {
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
        home: [
          modules + 'vue/dist/vue.min.js',
          modules + 'simplemde/dist/simplemde.min.js',
          src + 'js/home.js',
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
      },
      dest: dev + 'js/',
    },
    inline: {
      src: [
        modules + 'fg-loadcss/src/loadCSS.js',
        modules + 'fg-loadcss/src/cssrelpreload.js',
        modules + 'loadjs/dist/loadjs.js',
      ],
      dest: tmplts + '_inline/',
    },
    babili: {
      mangle: {
        keepClassNames: true
      },
    },
    rename: {
      extname: '.min.js',
    },
  },


  // BrowserSync //

  browsersync: {
    files: [ dev + '**/*', tmplts + '**/*' ],
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
    styles: src + 'css/**/*.scss',
    scripts: src + 'js/*.js',
  },


  // Revisions //

  revisions: {
    src: {
      css: dev + '**/*.css',
      js: dev + '**/*.js',
    },
    dest: dist,
    manifest: 'revisions.json',
    options: {
      base: dist,
      merge: true,
    },
  },


  // Service Worker //

  serviceWorker: {
    root: root,
    name: 'service-worker.js',
    config: {
      cacheId: pkg.name,
      importScripts: [ 'sw.js' ],
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
      runtimeCaching: [ {
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
      }, ],
      staticFileGlobs: [
        dist + '/css/**.css',
        dist + '/js/**.js',
      ],
      stripPrefix: root,
      // verbose defaults to false, but for the purposes of this demo, log more.
      verbose: true,
    },
  },


  // Favicons //

  favicons: {
    src: src + 'favicons/*(*.png|*.jpg|*.jpeg)',
    options: {
      appName: 'Connor Bär',
      appDescription: pkg.description,
      developerName: pkg.author,
      developerURL: 'https://connorbaer.co',
      background: '#ffffff',
      theme_color: '#000000',
      path: 'favicons/',
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
        coast: {
          offset: 15
        }, // Create Opera Coast icon with offset 15%. `boolean` or `{ offset: offsetInPercentage }`
        yandex: false, // Create Yandex browser icon. `boolean`
      },
    },
    destHtml: '',
    dest: root + 'favicons/',
  },
};
