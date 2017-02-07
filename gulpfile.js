var gulp = require('gulp');
var gulputil = require('gulp-util');
var pug = require('gulp-pug');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var exorcist = require('exorcist');
var browserSync = require('browser-sync').create();

function bundle(bundler) {
    return bundler
      .bundle()
      .on('error', function (e) {
        gulputil.log(e.message);
    })
      .pipe(exorcist('./build/js/dist/app.js.map'))
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./build/js/dist'))
      .pipe(browserSync.stream());
}

const srcPaths = {
    pug: './app/*.pug',
    css: './app/*.css'
};

const buildPaths = {
    build: './build',
    pug: './build/'
};

gulp.task('pug', () => {
    gulp.src(srcPaths.pug)
      .pipe(pug())
      .pipe(gulp.dest(buildPaths.pug));
});

gulp.task('js', function () {
    return bundle(browserify('./app/js/app.js'));
});

gulp.task('watch', function () {
    gulp.watch(srcPaths.pug, ['pug']);

    watchify.args.debug = true;
    var watcher = watchify(browserify('./app/js/app.js', watchify.args).transform(babelify, { presets: ['es2015'] }));

    bundle(watcher);

    watcher.on('update', function () {
        bundle(watcher);
    });

    watcher.on('log', gulputil.log);

    var files = [
          buildPaths.build
    ];

    browserSync.init(files, {
        browser: 'chrome',
        server: './build',
        logFileChange: false,
        port: 3010
    });

});

gulp.task('default', ['pug', 'watch', 'css']);
