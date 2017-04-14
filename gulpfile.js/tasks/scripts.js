/**
 * SCRIPTS
 */


const gulp = require( 'gulp' ),
  plugins = require( 'gulp-load-plugins' )( {
    camelize: true
  } ),
  config = require( '../../gulpconfig' ).scripts;


// Compile Javascript bundles.
gulp.task( 'scripts-bundles', () => {
  const bundles = config.bundles.src;

  Object.keys( bundles ).forEach( function ( key ) {
    return gulp.src( bundles[ key ] )
      .pipe( plugins.concat( key ) )
      .pipe( plugins.jshint() )
      .pipe( plugins.babili( config.babili ) )
      .pipe( plugins.rename( config.rename ) )
      .pipe( gulp.dest( config.bundles.dest ) );
  } );
} );

// Compile JavaScript files for inlining.
gulp.task( 'scripts-inline', () => {
  return gulp.src( config.inline.src )
    .pipe( plugins.jshint() )
    .pipe( plugins.babili( config.babili ) )
    .pipe( plugins.rename( config.rename ) )
    .pipe( gulp.dest( config.inline.dest ) );
} );

// Shortcut.
gulp.task( 'scripts', [ 'scripts-bundles', 'scripts-inline' ] );
