var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');

gulp.task('connect', function() {
    connect.server({
        root: 'dawg-coffee',
        livereload: 'true'
    })
});

gulp.task('sass', function() {
    gulp.src('dawg-coffee/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dawg-coffee/css/'))
        .pipe(connect.reload());
});

gulp.task('sass:watch', function() {
    gulp.watch('dawg-coffee/scss/*.scss', ['sass']);
});

//no parameter, default task
gulp.task('default', ['sass', 'sass:watch', 'connect']);


