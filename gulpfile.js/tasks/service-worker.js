/*
 * SERVICE WORKER
 */

const gulp = require( 'gulp' ),
  path = require( 'path' ),
  sw = require( 'sw-precache' ),
  config = require( '../../gulpconfig' ).serviceWorker;


// Generate service-worker.js.
gulp.task( 'service-worker', ( callback ) => {
  sw.write( path.join( config.root, config.name ), config.config, callback );
} );
