const gulp = require('gulp');
//fot styles
const stylus = require('gulp-stylus');
const gcmq = require('gulp-group-css-media-queries');
const autoprefixer = require('gulp-autoprefixer');
const minify = require("gulp-csso");
//local server and reload
const browserSync = require('browser-sync');
//for images
const imagemin = require('gulp-imagemin');
const pngQuant = require('imagemin-pngquant');
//other
const pug = require('gulp-pug');
const del = require('del');
//path config
const public = './public';
const source = './source';
const paths = {
    styl: {
        src: source + '/stylus/**/*.styl',
        dest: public + '/css/',
        main: source + '/stylus/main.styl',
        help: source + '/stylus/helpers'
    },

    pug: {
        src: source + '/**/*.pug',
        pages: source + '/pages/*.pug'
    }
};
//tasks
gulp.task('styles', () => {

    return gulp.src(paths.styl.main)
        .pipe(stylus())
        .pipe(autoprefixer({
            browsers: ['> 0.01%'],
            cascade: false
        }))
        .pipe(gcmq())
        .pipe(minify())
        .pipe(gulp.dest(paths.styl.dest))
        .pipe(browserSync.reload({stream: true}));

});

gulp.task("pages", () => {

    return gulp.src(paths.pug.pages)
        .pipe(pug({pretty: true}))  //с переносом pretty: true
        .pipe(gulp.dest(public))
        .pipe(browserSync.reload({stream: true}));

});

gulp.task('browser-sync', () => {

    browserSync({
        server: {baseDir: public},
        notify: false
    });

});

gulp.task('watch', ['browser-sync'], () => {

    gulp.watch([paths.styl.main, paths.styl.src], ['styles']);
    gulp.watch(paths.pug.src, ["pages"]);

});

gulp.task('clean-public', () => {

    return del(public);

});

gulp.task('public', ['clean-public', 'pages', 'styles', 'watch']);

gulp.task('smart-grid', () => {

    const smartgrid = require('smart-grid');

    const settings = {
        outputStyle: 'styl', /* less || scss || sass || styl */
        columns: 12, /* number of grid columns */
        offset: "30px", /* gutter width px || % */
        container: {
            maxWidth: '1200px', /* max-width оn very large screen */
            fields: '30px' /* side fields */
        },
        breakPoints: {
            lg: {
                'width': '1100px', /* -> @media (max-width: 1100px) */
                'fields': '30px' /* side fields */
            },
            md: {
                'width': '960px',
                'fields': '15px'
            },
            sm: {
                'width': '780px',
                'fields': '15px'
            },
            xs: {
                'width': '560px',
                'fields': '15px'
            }
            /*
            We can create any quantity of break points.
            some_name: {
                some_width: 'Npx',
                some_offset: 'N(px|%)'
            }
            */
        }
    };

    smartgrid(paths.styl.help, settings);

});

gulp.task('default', ['public']);