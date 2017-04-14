/**
 * STYLES
 */


const gulp = require( 'gulp' ),
  critical = require( 'critical' ),
  plugins = require( 'gulp-load-plugins' )( {
    camelize: true
  } ),
  sequence = require( 'run-sequence' ),
  config = require( '../../gulpconfig' ).styles;


// Used to get around Sass's inability to properly @import vanilla CSS; see: https://github.com/sass/sass/issues/556
gulp.task( 'styles-update', () => {
  return gulp.src( config.update.src )
    .pipe( plugins.changed( config.update.dest ) )
    .pipe( plugins.rename( config.update.rename ) )
    .pipe( gulp.dest( config.update.dest ) );
} );


// Build stylesheets from source SCSS files, post-process, minify and write source maps (for debugging).
gulp.task( 'styles-compile', () => {
  return gulp.src( config.compile.src )
    .pipe( plugins.plumber() )
    .pipe( plugins.sourcemaps.init() ) // Note that sourcemaps need to be initialized with libsass.
    .pipe( plugins.sass( config.compile.libsass ) )
    .pipe( plugins.cssnano( config.compile.cssnano ) )
    .pipe( plugins.rename( config.compile.rename ) )
    .pipe( plugins.sourcemaps.write( './' ) )
    .pipe( gulp.dest( config.compile.dest ) );
} );


// Copy accelerated mobile pages CSS to template folder for inlining.
gulp.task( 'styles-amp', () => {
  return gulp.src( config.amp.src )
    .pipe( gulp.dest( config.amp.dest ) );
} );


// Shortcut.
gulp.task( 'styles', ( callback ) => {
  sequence( 'styles-compile', 'styles-amp',
    callback );
} );


// Process data in an array synchronously, moving onto the n+1 item only after the nth item callback.
function doSynchronousLoop( data, processor, done ) {
  if ( data.length > 0 ) {
    const loop = ( data, i, processor, done ) => {
      processor( data[ i ], i, () => {
        if ( ++i < data.length ) {
          loop( data, i, processor, done );
        } else {
          done();
        }
      } );
    };

    loop( data, 0, processor, done );
  } else {
    done();
  }
}

// Process the critical path CSS one at a time
function criticalCSS( element, i, callback ) {
  console.log( 'Generating critical CSS for ' + config.critical.src + element.url );
  critical.generate( {
    src: config.critical.src + element.url,
    dest: config.critical.dest + element.template + '.min.css',
    base: config.critical.base,
    css: [
      config.critical.css,
    ],
    minify: true,
    dimensions: [ {
      height: config.critical.small.height,
      width: config.critical.small.width,
    }, {
      height: config.critical.large.height,
      width: config.critical.large.width,
    }, ],
  }, ( err, output ) => {
    console.log( ( err === null ? 'Success!' : err ) );
    callback();
  } );
}

// Generate critical CSS.
gulp.task( 'styles-critical', ( callback ) => {
  doSynchronousLoop( config.critical.files, criticalCSS, () => {
    // All done.
    callback();
  } );
} );
