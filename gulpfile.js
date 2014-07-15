var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var mocha = require('gulp-mocha');

gulp.task('default', ['bundle']);

gulp.task('bundle', function() {
  var bundler = watchify('./src/fastdate.js');

  bundler.on('update', rebundle);

  function rebundle () {
    return bundler.bundle({ standalone: 'fastdate' })
      // log errors if they happen
      .on('error', function(e) {
        gutil.log('Browserify Error', e);
      })
      .pipe(source('fastdate.js'))
      .pipe(gulp.dest('.'));
  }

  return rebundle();
});

gulp.task('mocha', function() {
    return gulp.src(['test/*.js'], { read: false })
        .pipe(mocha({
            reporter: 'spec',
            globals: {
                should: require('should')
            }
        }));
});