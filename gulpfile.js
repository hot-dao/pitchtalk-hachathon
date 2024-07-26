const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const newer = require('gulp-newer');
const { series, parallel } = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');

// Пути к вашим файлам
const paths = {
    pug: {
        src: 'src/**/*.pug',
        dest: 'dist/'
    },
    styles: {
        src: 'src/**/*.sass',
        dest: 'dist/css/'
    },
    images: {
        src: 'src/images/**/*',
        dest: 'dist/images/'
    },
    fonts: {
        src: 'src/fonts/**/*',
        dest: 'dist/fonts/'
    },
    css: {
        src: 'src/fonts/*.css',
        dest: 'dist/fonts/'
    },
    scripts: {
        src: 'src/js/**/*.js',
        dest: 'dist/js/'
    }
};

// Задача для компиляции Pug в HTML
function compilePug() {
    return gulp.src('src/index.pug')
        .pipe(pug())
        .pipe(gulp.dest(paths.pug.dest));
}

// Очистка старых стилей
async function cleanStyles() {
    const del = (await import('del')).deleteAsync;
    return del([paths.styles.dest + 'styles.css']);
}

// Задача для компиляции Sass в CSS
function compileSass() {
    return gulp.src(paths.styles.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('styles.css'))
        .pipe(cleanCSS()) // Опционально: минимизация CSS
        .pipe(gulp.dest(paths.styles.dest));
}

// Задача для копирования изображений
function copyImages() {
    console.log('Copying images...');
    return gulp.src(paths.images.src, { encoding: false })
        .pipe(newer(paths.images.dest))
        .pipe(gulp.dest(paths.images.dest))
        .on('end', () => console.log('Images copied successfully!'));
}

// Задача для копирования шрифтов
function copyFonts() {
    console.log('Copying fonts...');
    return gulp.src(paths.fonts.src, { encoding: false })
        .pipe(newer(paths.fonts.dest))
        .pipe(gulp.dest(paths.fonts.dest))
        .on('end', () => console.log('Fonts copied successfully!'));
}

// Задача для копирования CSS-файлов
function copyCss() {
    console.log('Copying CSS files...');
    return gulp.src(paths.css.src)
        .pipe(newer(paths.css.dest))
        .pipe(gulp.dest(paths.css.dest))
        .on('end', () => console.log('CSS files copied successfully!'));
}

// Задача для копирования JS-файлов
function copyScripts() {
    console.log('Copying JS files...');
    return gulp.src(paths.scripts.src)
        .pipe(newer(paths.scripts.dest))
        .pipe(gulp.dest(paths.scripts.dest))
        .on('end', () => console.log('JS files copied successfully!'));
}

// Наблюдение за изменениями в файлах
function watchFiles() {
    gulp.watch(paths.pug.src, compilePug);
    gulp.watch(paths.styles.src, series(cleanStyles, compileSass));
    gulp.watch(paths.images.src, copyImages);
    gulp.watch(paths.fonts.src, copyFonts);
    gulp.watch(paths.css.src, copyCss);
    gulp.watch(paths.scripts.src, copyScripts);
}

// Экспорт задач для CLI
exports.pug = compilePug;
exports.sass = series(cleanStyles, compileSass);
exports.images = copyImages;
exports.fonts = copyFonts;
exports.css = copyCss;
exports.scripts = copyScripts;
exports.default = parallel(compilePug, series(cleanStyles, compileSass), copyImages, copyFonts, copyCss, copyScripts, watchFiles);
