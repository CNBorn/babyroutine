var gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    reactify = require('reactify'),
    debowerify = require('debowerify'),
    uglify = require('gulp-uglify'),
    buffer = require('vinyl-buffer');

var path = {
    STATIC_DEPS: ['bower_components/**/*.*',
                  'js/**/*.*', 'index.html', 'ratchet/**/*.*', 'css/**/*.*',
                  'img/**/*.*', 'vendor/**/*.*'],
    OUT: 'build.js',
    DEST: 'dist',
    ENTRY_POINT: './js/main.js'
};

gulp.task('copy', function(){
    gulp.src(path.STATIC_DEPS, { base: './' })
        .pipe(gulp.dest(path.DEST));
});

gulp.task('watch', function() {
    gulp.watch(path.STATIC_DEPS, ['copy']);

    var watcher  = watchify(browserify({
        entries: [path.ENTRY_POINT],
        transform: [reactify, debowerify],
        debug: true,
        cache: {}, packageCache: {}, fullPaths: true
    }));

    return watcher.on('update', function () {
        watcher.bundle()
            .pipe(source(path.OUT))
            .pipe(gulp.dest(path.DEST))
        console.log('Updated');
    })
        .bundle()
        .pipe(source(path.OUT))
        .pipe(gulp.dest(path.DEST));
});


var connect = require('gulp-connect');

gulp.task('webserver', function() {
    connect.server({
        root: 'dist',
        livereload: true,
        port: 8000
    });
});


gulp.task('js:min', function() {
    return browserify({
        entries: [path.ENTRY_POINT],
        transform: [reactify, debowerify],
        debug:false
    })
        .bundle()
        .pipe(source(path.OUT))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(path.DEST));
})

gulp.task('default', ['copy', 'webserver','watch']);
gulp.task('distribution', ['copy', 'js:min']);
