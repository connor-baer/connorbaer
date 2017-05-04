/**
 * WEBPACK
 */


const gulp = require( 'gulp' ),
  plugins = require( 'gulp-load-plugins' )( {
    camelize: true
  } ),
  config = require( '../../gulpconfig' ).webpack,
  webpackConfig = require( '../../webpack.config' );


// Run webpack.
gulp.task( 'webpack-bundle', () => {
  return gulp.src( config.src )
    .pipe(plugins.webpack( webpackConfig ))
    .pipe(gulp.dest( config.dest ));
} );

// Shortcut.
gulp.task( 'webpack', [ 'webpack-bundle' ] );
