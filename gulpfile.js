var gulp = require('gulp'),
		uglify = require("gulp-uglify"),
    connect = require('gulp-connect');

gulp.task('minify', function(){
  gulp.src('src/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('dist/'))
  .pipe(gulp.dest('demo/js/'));
});

gulp.task('connect', function() {
	connect.server({
		root: 'demo/',
		livereload: true
	});
});

gulp.task('html', function(){
	gulp.src('demo/*.html')
	.pipe(connect.reload());
});

gulp.task('watch', function(){
	gulp.watch(['demo/*.html'], ['html']);
	gulp.watch(['src/*.js'], ['minify']);
});

gulp.task('default', ['minify', 'connect', 'watch']);