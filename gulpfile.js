import gulp from "gulp";
const { series, parallel, src, dest } = gulp;
import bS from "browser-sync";
import concat from "gulp-concat"
const browserSync = bS.create();

gulp.task("html", function () {
    return gulp.src("./src/index.html").pipe(gulp.dest("./dist"));
});

gulp.task("js", function() {
    return gulp.src(["./src/mediator/*.js",
        "./src/block/*.js",
        "./src/render/*.js",
        "./src/components/*.js",
    ])
        .pipe(concat("index.js"))
        .pipe(dest("./dist"));
});

gulp.task("serve", function () {
    browserSync.init({
        server: {
            baseDir: "dist",
        },
    });

    gulp.watch("./src/index.html").on("change", series("html"));
    gulp.watch("./src/**/*.js").on("change", series("js"));

    gulp.watch("./dist/index.html").on("change", browserSync.reload);
    gulp.watch("./dist/index.js").on("change", browserSync.reload);
});

gulp.task("build", series("html", "js"));

gulp.task("default", series(parallel("html"), "js", "serve"));