/**
 * GULP
 *
 * Default
 * Build
 * Dist
 */


const gulp = require( 'gulp' ),
  sequence = require( 'run-sequence' );


// Default task chain: build -> browsersync -> watch
gulp.task( 'default', [ 'watch' ] );


// Build task chain: clean -> styles & scripts
gulp.task( 'build', ( callback ) => {
  sequence( [ 'clean', 'styles-update' ], [
    'styles',
    'scripts',
    'webpack',
  ],
    callback );
} );


// Dist task chain: build -> revisions -> critical & service-worker
gulp.task( 'dist', ( callback ) => {
  sequence( 'build', 'clean-dist', 'revisions', [ 'styles-critical', 'styles-amp',
  'service-worker' ],
    callback );
} );
