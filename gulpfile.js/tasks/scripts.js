// ==== SCRIPTS ==== //

const gulp    = require('gulp'),
      plugins = require('gulp-load-plugins')({ camelize: true }),
      config  = require('../../gulpconfig').scripts
;


// Bundle Javascript files.
gulp.task('scripts-bundles', () => {
  const bundles = config.src.bundles;

  Object.keys(bundles).forEach(function(key) {
    return gulp.src(bundles[key])
      .pipe(plugins.concat(key))
      .pipe(plugins.changed(config.dest))
      .pipe(plugins.babel({presets: [['es2015', { 'modules': false }]]}))
      .pipe(plugins.uglify(config.minify.uglify))
      .pipe(plugins.rename(config.minify.rename))
      .pipe(gulp.dest(config.dest));
  });
});

// Copy third-party JavaScript to the public assets folder.
gulp.task('scripts-inline', () => {
  return gulp.src(config.src.inline)
    .pipe(plugins.changed(config.dest))
    .pipe(plugins.uglify(config.minify.uglify))
    .pipe(plugins.rename(config.minify.rename))
    .pipe(gulp.dest(config.destInline));
});

// Master script task; lint -> bundle -> minify.
gulp.task('scripts', ['scripts-bundles', 'scripts-inline']);
