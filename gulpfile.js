var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var jsx = require('gulp-jsx');

gulp.task('default', () =>
    gulp.src('public/src/css/main.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('public/dist/css'))
);

gulp.task('build', function() {
  return gulp.src('app/controllers/src/*.js')
	.pipe(jsx({
	  factory: 'React.createClass'
	}))
	.pipe(gulp.dest('app/controllers/dist'));
});
