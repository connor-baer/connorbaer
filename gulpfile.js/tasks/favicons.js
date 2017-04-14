/*
 * FAVICONS
 */


const gulp = require( 'gulp' ),
  plugins = require( 'gulp-load-plugins' )( {
    camelize: true
  } ),
  config = require( '../../gulpconfig' ).favicons;


// Generate favicons.
gulp.task( 'favicons', () => {
  let htmlFilter = plugins.filter( config.options.html, {
    restore: true
  } );
  let iconsFilter = plugins.filter( [ '*', '!' + config.options.html ], {
    restore: true
  } );

  return gulp.src( config.src )
    .pipe( plugins.favicons( config.options ) )
    .pipe( htmlFilter )
    .pipe( gulp.dest( config.destHtml ) )
    .pipe( htmlFilter.restore )
    .pipe( iconsFilter )
    .pipe( gulp.dest( config.dest ) );
} );
