/**
 * CLEAN
 */


const gulp = require( 'gulp' ),
  del = require( 'del' ),
  config = require( '../../gulpconfig' ).clean;


// Clean out junk files before build.
gulp.task( 'clean-tidy', () => {
  return del( config.tidy );
} );


// Totally wipe the compiled development files.
gulp.task( 'clean-dev', () => {
  return del( config.dev );
} );


// Shortcut.
gulp.task( 'clean', [ 'clean-tidy', 'clean-dev' ] );


// Totally wipe the compiled production files.
gulp.task( 'clean-dist', () => {
  return del( config.dist );
} );
