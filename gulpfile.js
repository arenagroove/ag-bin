var gulp = require("gulp");
var connect = require("gulp-connect");
var open = require("gulp-open");


var bin = "tests/bin";
var cssSources = [bin + "css/**/*.css"];
var htmlSources = [bin + "/**/*.html"];
var jsSources = [bin + "/**/*.js"];

var port = process.env.PORT || 9000;

gulp.task("html", function() {
    gulp.src(htmlSources)
        .pipe(connect.reload());
});

gulp.task("css", function() {
    gulp.src(cssSources)
        .pipe(connect.reload());
});

gulp.task("js", function() {
    gulp.src(jsSources)
        .pipe(connect.reload());
});



gulp.task("connect", function() {
    connect.server({
        livereload: true,
        port: port
    });
});

gulp.task("watch", function() {
    gulp.watch(jsSources, ["js"]);
    gulp.watch(cssSources, ["css"]);
    gulp.watch(htmlSources, ["html"]);
});


gulp.task("launchInBrowser", function() {
    var options = {
        uri: "localhost:" + port + "/" + bin,
        app: "firefox"
    };
    gulp.src(__filename)
        .pipe(open(options));
});


gulp.task("default", ["html", "css", "js", "connect", "watch", "launchInBrowser"]);
