'use strict';

const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const browserSync = require('browser-sync');
const gulp = require('gulp');
const minifier = require('gulp-minifier');
const sass = require('gulp-sass');

sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src(['node_modules/swiper/swiper.scss',
                    'src/sass/**/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('app.css'))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./src/'))
    .pipe(browserSync.stream());
});

gulp.task('js', function(){
    return gulp.src(['node_modules/jquery/dist/jquery.min.js',
                    'node_modules/swiper/js/swiper.min.js',
                    'src/js/main.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./src/'))
        .pipe(browserSync.stream());
});

gulp.task('serve', function() {

    browserSync.init({
        server: "./src"
    });

    gulp.watch("src/sass/**/*.scss", gulp.series('sass'));
    gulp.watch("src/js/main.js", gulp.series('js'));
    gulp.watch(["src/app.css",
                "src/app.js",
                "src/index.html"]).on('change', browserSync.reload);
});

gulp.task('production', function(){
    return gulp.src(['./src/index.html',
                     './src/app.css',
                     './src/app.js',
                     './src/font/*',
                     './src/images/*'],
                     { base: './src/' }
                    )
                .pipe(minifier({
                    minify: true,
                    minifyHTML: {
                      collapseWhitespace: true,
                      conservativeCollapse: true,
                    },
                    minifyJS: {
                      sourceMap: true,
                    },
                    minifyCSS: true,
                    getKeptComment: function (content, filePath) {
                        var m = content.match(/\/\*![\s\S]*?\*\//img);
                        return m && m.join('\n') + '\n' || '';
                    }
                }))
                .pipe(gulp.dest('./dist/'));
});