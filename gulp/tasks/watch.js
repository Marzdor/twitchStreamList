var gulp = require("gulp"),
  watch = require("gulp-watch");


gulp.task("watch", function() {
  watch("./assets/styles/styles.css", function() {
    gulp.start("cssInject");
  });
});

gulp.task("cssInject", ["styles"], function() {
  return gulp.src("./assets/styles/styles.css")
});