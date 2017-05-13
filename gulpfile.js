const gulp = require('gulp');
//fot styles
const stylus = require('gulp-stylus');
const gcmq = require('gulp-group-css-media-queries');
const autoprefixer = require('gulp-autoprefixer');
//local server and reload
const browserSync = require('browser-sync');
//for images
const imagemin = require('gulp-imagemin');
const pngQuant = require('imagemin-pngquant');
//other
const del = require('del');
//path config
const paths = {
    build: 'build/',
    src: 'src/',

    js: {
        src: 'js/**/*.js'
    },

    css: {
        src: 'stylus/**/*.styl',
    },

    html: {
        src: '*.html'
    },

    img: {
        src: 'img/**/*'
    }
};

gulp.task('stylus', () => {
    return gulp.src(paths.src + paths.css.src)
        .pipe(stylus())
        .pipe(autoprefixer({
            browsers: ['> 0.01%'],
            cascade: false
        }))
        .pipe(gcmq())
        .pipe(gulp.dest(paths.src + 'css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('img', () => {
    return gulp.src(paths.src + paths.img.src)
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngQuant()]
        }))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('browser-sync', () => {
    browserSync({
        server: {baseDir: paths.src},
        notify: false
    });
});

gulp.task('watch', ['stylus', 'browser-sync'], () => {
    gulp.watch(paths.src + paths.css.watch, ['styl']);
    gulp.watch(paths.src + '/**/' + paths.html.src, browserSync.reload);
    gulp.watch(paths.src + paths.js.src, browserSync.reload);
});

gulp.task('clean-build-dir', function() {
    return del(paths.build);
});

gulp.task('default', ['watch']);