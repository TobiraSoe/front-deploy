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
//path config
const paths = {
    src: 'src/',

    css: {
        watch: 'stylus/**/*.styl',
        dest: 'css'
    },

    html: {
        src: '*.html'
    },

    img: {
        src: 'img/**/*'
    }
};

gulp.task('stylus', () => {
    return gulp.src(paths.src + paths.css.watch)
        .pipe(stylus())
        .pipe(autoprefixer({
            browsers: ['> 0.01%'],
            cascade: false
        }))
        .pipe(gcmq())
        .pipe(gulp.dest(paths.src + paths.css.dest))
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