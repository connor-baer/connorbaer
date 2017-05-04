/**
 * REVISIONS
 */

const gulp = require( 'gulp' ),
  sequence = require( 'run-sequence' );
  plugins = require( 'gulp-load-plugins' )( {
    camelize: true
  } ),
  config = require( '../../gulpconfig' ).revisions;


// Version the CSS.
gulp.task( 'revisions-styles', () => {
  return gulp.src( config.src.css )
    .pipe( plugins.rev() )
    .pipe( gulp.dest( config.dest ) )
    .pipe( plugins.rev.manifest( config.dest + config.manifest, config.options ) )
    .pipe( gulp.dest( config.dest ) );
} );


// Version the JS.
gulp.task( 'revisions-scripts', () => {
  return gulp.src( config.src.js )
    .pipe( plugins.rev() )
    .pipe( gulp.dest( config.dest ) )
    .pipe( plugins.rev.manifest( config.dest + config.manifest, config.options ) )
    .pipe( gulp.dest( config.dest ) );
} );


// Master revisions task.
gulp.task( 'revisions', ( callback ) => {
  sequence( 'revisions-styles', 'revisions-scripts',
    callback );
} );
