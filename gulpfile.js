var gulp = require('gulp');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var eslint = require('gulp-eslint');

function onBuild(done) {
  return function(err, stats) {
    if (err) {
      console.log('Error', err);
    } else {
      if (process.env.NODE_ENV === 'development') {
        console.log(stats.toString());
      }
      console.log('Building webpack...');
    }

    if (done) {
      done();
    }
  };
}

gulp.task('default', ['less', 'webpack', 'eslint']);
gulp.task('dev', ['less', 'webpack', 'eslint', 'watch']);

gulp.task('less', function() {
  return gulp.src('./public/css/app.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dist'));
});

gulp.task('webpack', function(done) {
  webpack(webpackConfig).run(onBuild(done));
});

gulp.task('eslint', function() {
  var eslintConfig = {
    rules: {
      quotes: [2, 'single']
    },
    envs: ['browser', 'node', 'es6']
  };

  return gulp.src(['./src/server.js'])
    .pipe(eslint(eslintConfig))
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('watch', function() {
  gulp.watch('./src/**/*.{js, jsx}', ['webpack']);
  gulp.watch('./{config, lib, models}/**/*.js', ['webpack']);
  gulp.watch('./public/css/*.less', ['less']);
});
