var gulp       = require('gulp');
    gutil      = require('gulp-util');
var googleWebFonts = require('gulp-google-webfonts');
var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
    replaceString: /\bgulp[\-.]/
});

var config = {
    sassPath: './resources/sass',
    bowerDir: './bower_components'
}

// define the default task and add the watch task to it
gulp.task('default', ['watch']);
gulp.task('build', ['css', 'cssDep', 'js', 'jsDep', 'icons', 'fonts']);

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src('source/javascript/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});
gulp.task('js', function() {
  var jsFiles = [
    'source/javascript/tipuesearch_set.js',
    'source/javascript/tipuesearch.js',
    'source/javascript/!(tipuesearch)*.js',
    ];
  return gulp.src(jsFiles)
    .pipe(plugins.filter('*.js'))
    .pipe(plugins.concat('mickem-bootstrap.js'))
    .pipe(gutil.env.type === 'production' ? plugins.uglify() : gutil.noop()) 
    .pipe(gulp.dest('static/js'));
});
gulp.task('jsDep', function() {
  return gulp.src(plugins.mainBowerFiles())
    .pipe(plugins.filter('*.js'))
    .pipe(plugins.concat('dep.js'))
    .pipe(gutil.env.type === 'production' ? plugins.uglify() : gutil.noop()) 
    .pipe(gulp.dest('static/js'));
});
gulp.task('css', function() {
  var cssFiles = ['source/css/*'];
  gulp.src(cssFiles)
    .pipe(plugins.filter('*.css'))
    .pipe(plugins.concat('mickem-bootstrap.css'))
    .pipe(gutil.env.type === 'production' ? plugins.minifyCss() : gutil.noop()) 
    .pipe(gulp.dest('static/css'));
});
gulp.task('cssDep', function() {
  gulp.src(plugins.mainBowerFiles())
    .pipe(plugins.filter('*.css'))
    .pipe(plugins.concat('dep.css'))
    .pipe(gutil.env.type === 'production' ? plugins.minifyCss() : gutil.noop()) 
    .pipe(gulp.dest('static/css'));
});
gulp.task('icons', function() {
    return gulp.src(config.bowerDir + '/font-awesome/fonts/**.*')
        .pipe(gulp.dest('static/fonts'));
});
gulp.task('fonts', function () {
    return gulp.src('fonts.list')
        .pipe(googleWebFonts())
        .pipe(gulp.dest('static/fonts'))
        ;
});
gulp.task('watch', function() {
  gulp.watch('source/javascript/*', ['js']);
  gulp.watch('source/css/*', ['css']);
});