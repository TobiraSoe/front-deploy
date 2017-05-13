const gulp = require('gulp');
const stylus = require('gulp-stylus');
const gcmq = require('gulp-group-css-media-queries');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');

const config = {
    src: 'src/',

    css: {
        watch: 'stylus/**/*.styl',
        dest: 'css'
    },

    html: {
        src: '*.html'
    }
};

gulp.task('stylus', () => {
    return gulp.src(config.src + config.css.watch)
        .pipe(stylus())
        .pipe(autoprefixer({
            browsers: ['> 0.01%'],
            cascade: false
        }))
        .pipe(gcmq())
        .pipe(gulp.dest(config.src + config.css.dest))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('img', () => {

});