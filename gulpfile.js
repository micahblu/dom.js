var gulp = require("gulp");
var uglify = require("gulp-uglify");

gulp.task('minify', function(){
  gulp.src('src/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['minify']);
