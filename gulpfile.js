var gulp = require("gulp"),
    source = require("vinyl-source-stream"),
    buffer = require("vinyl-buffer"),
    browserify = require("browserify"),
    watchify = require("watchify"),
    concat = require("gulp-concat"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer-core"),
    addsrc = require("gulp-add-src"),
    babelify = require("babelify"),
    jshint = require("gulp-jshint"),
    stylish = require("jshint-stylish"),
    minifyCss = require("gulp-minify-css"),
    uglify = require("gulp-uglify");


var config = {
    css: {
        src: "./css/**/*.css",
        dest: "./static/"
    },

    js: {
        src: "./js/main.js",
        dest: "./static/"
    }
};

config.browserify = {
    entries: [config.js.src],
    transform: [babelify],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: false
};


gulp.task("browserify", function() {
    return browserify(config.browserify)
        .bundle()
        .pipe(source("main.js"))
        .pipe(buffer())
        .pipe(uglify({preserveComments: "some"}))
        .pipe(gulp.dest(config.js.dest));
});

gulp.task("lint", function () {
    return gulp.src("./js/*.js")
               .pipe(jshint("./.jshintrc"))
               .pipe(jshint.reporter(stylish))
               .on("error", function() {
                   beep();
               });
})

gulp.task("watch", function() {
    gulp.start("browserify", "css");

    gulp.watch(config.css.src, ["css"]);

    var watcher = watchify(browserify(config.browserify));
    return watcher
        .on("update", function () {
            var updateStart = Date.now();
            watcher.bundle()
                .pipe(source("main.js"))
                .pipe(gulp.dest(config.js.dest));

            var d = new Date();
            console.log("js updated ", (Date.now() - updateStart) + "ms (" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")");
        })
        .bundle()
        .pipe(source("main.js"))
        .pipe(gulp.dest(config.js.dest));
});


gulp.task("css", function () {
    var processors = [
        require("postcss-nested"),
        require("postcss-simple-vars")({ variables: require("./css/vars.js") }),
        autoprefixer({browsers: ["> 1%"], cascade: false})
    ];

    return gulp.src(config.css.src)
        .pipe(postcss(processors))
        .pipe(addsrc.prepend("./node_modules/normalize.css/normalize.css"))
        .pipe(concat("style.css"))
        .pipe(minifyCss())
        .pipe(gulp.dest(config.css.dest));
});


gulp.task("default", ["browserify", "css"]);
