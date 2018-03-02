var gulp = require("gulp"),
  postcss = require("gulp-postcss"),
  autoprefixer = require("autoprefixer"),
  cssvars = require("postcss-simple-vars"),
  cssImport = require("postcss-import"),
  nested = require("postcss-nested");



gulp.task("styles", function() {
  return gulp.src("./assets/styles/styles.css")
    .pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
    .on("error", function(err) {
      console.log(err.toString());
      this.emit("end");
    })
    .pipe(gulp.dest("./assets/styles/build"));

});