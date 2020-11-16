// const { series, parallel, src, dest } = require("gulp");
//
// const gulp = require("gulp"),
//     browserSync = require("browser-sync").create(),
//     concat = require("gulp-concat");
import gulp from "gulp";
const { series, parallel, src, dest } = gulp;
import bS from "browser-sync";
import concat from "gulp-concat";

const browserSync = bS.create();

// gulp.task("svgstore", function () {
//     const svgs = gulp
//         .src("./src/assets/icons/**/*.svg")
//         .pipe(
//             svgmin(function () {
//                 return {
//                     plugins: [
//                         {
//                             removeTitle: true,
//                         },
//                         {
//                             removeStyleElement: true,
//                         },
//                     ],
//                 };
//             })
//         )
//         .pipe(rename({ prefix: "icon-" }))
//         .pipe(svgstore({ inlineSvg: true }));
//
//     function fileContents(filePath, file) {
//         return file.contents.toString();
//     }
//
//     return gulp
//         .src("./src/index.html")
//         .pipe(inject(svgs, { transform: fileContents }))
//         .pipe(gulp.dest("./src"));
// });

// gulp.task("less", function () {
//     return src("./src/assets/styles/main.less")
//         .pipe(less())
//         .pipe(
//             autoprefixer({
//                 cascade: false,
//             })
//         )
//         .pipe(dest("./dist"));
// });

gulp.task("html", function () {
    return gulp.src("./src/index.html").pipe(gulp.dest("./dist"));
});

gulp.task("js", function() {
    return gulp.src(["./src/components/todo.js",
        "./src/components/block/block.js",
        "./src/components/mediator/mediator.js",
        "./src/components/render/render.js"])
        .pipe(dest("./dist"));
});

gulp.task("serve", function () {
    browserSync.init({
        server: {
            baseDir: "dist",
        },
    });

    //gulp.watch("./src/assets/styles/**/*.less").on("change", series("less"));
    gulp.watch("./src/index.html").on("change", series("html"));
    gulp.watch("./src/**/*.js").on("change", series("js"));

    //gulp.watch("./dist/style.css").on("change", browserSync.reload);
    gulp.watch("./dist/index.html").on("change", browserSync.reload);
    gulp.watch("./dist/index.js").on("change", browserSync.reload);
});

gulp.task("build", series("html", "js"));

gulp.task("default", series(parallel("html"), "js", "serve"));