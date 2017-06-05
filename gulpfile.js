// gulpfile.js
const gulp = require('gulp');
const babel = require('babelify');
const browserify = require('browserify');
const dev = require('vinyl-dev-stream');
const buffer = require('vinyl-buffer');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');

gulp.task('js', () => {
    browserify('src/app.js')
        .transform('babelify', {
            presets: ['es2015','react']
        })
        .bundle()
        .on('error',notify.onError({
            message: "Error: <%= error.message %>",
            title: 'Error in JS 💀'
        }))
        .pipe(dev('app.js'))
        .pipe(buffer())
        .pipe(gulp.dest('public/'))
        .pipe(reload({stream:true}));
});

gulp.task('bs', () => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});


gulp.task('default', ['js', 'bs', 'styles'], () => {
    gulp.watch('src/**/*.js',['js']);
    gulp.watch('src/**/*.scss',['styles']);
    gulp.watch('./public/style.css',reload);
});