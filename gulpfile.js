var gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    concat = require('gulp-concat'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer-core'),
    addsrc = require('gulp-add-src'),
    babelify = require('babelify'),
    eslint = require('gulp-eslint'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    reactify = require('reactify');


var config = {
    css: {
        src: './css/**/*.css',
        dest: './static/'
    },

    js: {
        src: './js/index.js',
        dest: './static/'
    }
};

config.browserify = {
    entries: [config.js.src],
    transform: [babelify.configure({optional: ['runtime']}), reactify],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: false
};


const browserifyErrorHandler = function(err){
    console.log(err.message);
    this.emit('end');
};


gulp.task('browserify', function() {
    return browserify(config.browserify)
        .bundle()
        .on('error', browserifyErrorHandler)
        .pipe(source('index.js'))
        .pipe(buffer())
        .pipe(uglify({preserveComments: 'some'}))
        .pipe(gulp.dest(config.js.dest));
});

gulp.task('lint', function () {
    return gulp.src('./js/*.js')
               .pipe(eslint('./.eslintrc'))
               .pipe(eslint.format())
               .pipe(eslint.failOnError());
})

gulp.task('watch', function() {
    gulp.start('browserify', 'css');

    gulp.watch(config.css.src, ['css']);

    var watcher = watchify(browserify(config.browserify));
    return watcher
        .on('update', function () {
            var updateStart = Date.now();
            watcher.bundle()
                .on('error', browserifyErrorHandler)
                .pipe(source('index.js'))
                .pipe(gulp.dest(config.js.dest));

            var d = new Date();
            console.log('js updated ', (Date.now() - updateStart) + 'ms (' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ')');
        })
        .bundle()
        .on('error', browserifyErrorHandler)
        .pipe(source('index.js'))
        .pipe(gulp.dest(config.js.dest));
});


gulp.task('css', function () {
    var processors = [
        require('postcss-mixins')({mixins: require('./css/mixins')}),
        require('postcss-nested'),
        require('postcss-simple-vars')({ variables: require('./css/vars.js') }),
        require('postcss-property-lookup'),
        require('postcss-color-function'),
        require('postcss-calc'),
        autoprefixer({browsers: ['> 1%'], cascade: false})
    ];

    return gulp.src(config.css.src)
        .pipe(postcss(processors))
        .on('error', function(err){ console.log(err.message); })
        .pipe(addsrc.prepend('./node_modules/normalize.css/normalize.css'))
        .pipe(concat('style.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest(config.css.dest));
});


gulp.task('default', ['browserify', 'css']);
