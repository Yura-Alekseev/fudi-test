var gulp = require('gulp');
var sass = require('gulp-sass');
var server = require('browser-sync').create();
var del = require('del');

gulp.task('clean', function () {
    return del('./build/');
});

gulp.task('copy', function () {
    return gulp.src([
        "./source/fonts/**/*",
        "./source/img/**",
        "./source/js/**",
        "./source/pages/**",
    ], {
        base: "./source/"
    })
        .pipe(gulp.dest("./build/"));
});

gulp.task('css', function () {
    return gulp.src('./source/scss/style.scss')
        .pipe(sass({
            errorLogToConsole: true
        }))
        .on('error', console.error.bind(console))
        .pipe(gulp.dest('./build/css/'))
});

gulp.task('html', function () {
    return gulp.src("./source/**/*.html")
        .pipe(gulp.dest("./build/"));
});

gulp.task('server', function () {
    server.init({
        server: "./build/",
        port: 3000
    });
    gulp.watch("./source/scss/**/*.scss", gulp.series('css', 'refresh'));
    gulp.watch("./source/**/*.html", gulp.series('html', 'refresh'));
});

gulp.task('refresh', function (done) {
    server.reload();
    done();
});

gulp.task('build', gulp.series(
    'clean',
    'copy',
    'css',
    'html'
));

gulp.task("start", gulp.series('build', 'server'));
