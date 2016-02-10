'use strict';

var gulp = require('gulp'),
    concatCss = require('gulp-concat-css'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    uncss = require('gulp-uncss');

// server connect
gulp.task('connect', function() {
  connect.server({
    root: '',
    livereload: true
  });
});

// css
gulp.task('css', function() {
   return gulp.src('content/scss/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['> 1%', 'IE 9'],
            cascade: false
        }))
    //.pipe(minifyCss({compatibility: 'ie9'}))
    //.pipe(rename('bundle.min.css'))
    .pipe(rename('styles.css'))
    .pipe(gulp.dest('content/'))
    .pipe(connect.reload())
    .pipe(notify('CSS Done! :)'));
});

// min BootStrap
/*gulp.task('BootStrap', function () {
    return gulp.src('content/bootstrap.css')
        .pipe(uncss({
            html: ['index.html']
        }))
        .pipe(gulp.dest('dist/content/'));
});*/

// JavaScript
/*gulp.task('js', function() {
  return gulp.src('/*.js')
    .pipe(uglify())
    .pipe(rename('script.min.js'))
    .pipe(gulp.dest('app/js/'))
    .pipe(notify('JS Done! :)'));
});*/
// html
gulp.task('html', function(){
  gulp.src('index.html')
  .pipe(connect.reload())
  .pipe(notify('HTML Done! :)'));
});

// watch
gulp.task('watch', function(){
  gulp.watch('content/scss/styles.scss', ['css']);
  gulp.watch('index.html', ['html']);
});

// default
gulp.task('default', ['connect', 'html', 'css', 'watch']);