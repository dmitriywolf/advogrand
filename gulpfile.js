"use strict";

let gulp = require('gulp');
let sass = require('gulp-sass');
sass.compiler = require('node-sass');
let autoprefixer = require('gulp-autoprefixer');
let concat = require('gulp-concat');
let rename = require('gulp-rename');
let uglify = require('gulp-uglify');
let cleanCss = require('gulp-clean-css');
let browserSync = require('browser-sync').create();
let del = require('del');

//Static Server
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./src/"
        }
    });
});

//Style SASS --> CSS
gulp.task('style', function () {
    return gulp.src('./src/sass/style.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        // .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./src/css'))
        .pipe(browserSync.reload({stream: true}))
});

// Отслеживание HTML
gulp.task('html', function () {
    return gulp.src('src/*.html')
        .pipe(browserSync.reload({stream: true}))
});

// Отслеживание изменений в JS
gulp.task('script', function () {
    return gulp.src('src/js/*.js')
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('watch', function () {
    gulp.watch('src/sass/**/*.scss', gulp.parallel('style'));
    gulp.watch('src/*.html', gulp.parallel('html'));
    gulp.watch('src/js/*.js', gulp.parallel('script'));
});



gulp.task('default', gulp.parallel('style', 'browser-sync', 'watch'));

