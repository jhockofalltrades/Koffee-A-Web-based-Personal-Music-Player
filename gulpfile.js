var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var csso = require('gulp-csso');
var minify = require('gulp-minify');
var inject = require('gulp-inject');
/* Add X-browser compatibility prefixes to all *.css */
// gulp.task('default', () =>
//     gulp.src('./assets/css/style.css')
//         .pipe(autoprefixer({
//             browsers: ['last 2 versions'],
//             cascade: false
//         }))
//         .pipe(gulpCopy('.assets/prod/css/'))
//         .pipe(gulp.dest('./assets/prod/css/'))
// );

// /* Minify css */
// gulp.task('compress-css', function () {
//     return gulp.src('./assets/raw/css/style.css')
//         .pipe(csso())
//         .pipe(gulp.dest('./assets/css/'));
// });

/* Minify js */
gulp.task('default', function() {
  gulp.src('./assets/js/*.js')
    .pipe(minify({
        ext:{
            src:'-raw.js',
            min:'.js'
        }
    }))
    .pipe(gulp.dest('./assets/js'))
});

// /* Inject assets */
// gulp.task('inject-css', function () {
//   var target = gulp.src('./application/views/templates/header.php');
//   // It's not necessary to read the files (will speed up things), we're only after their paths: 
//   var sources = gulp.src(['./assets/css/*.css'], {read: false});
 
//   return target.pipe(inject(sources))
//     .pipe(gulp.dest('./application/views/templates/'));
// });

// gulp.task('inject-js', function () {
//   var target = gulp.src('./application/views/templates/footer.php');
//   // It's not necessary to read the files (will speed up things), we're only after their paths: 
//   var sources = gulp.src(['./assets/js/*.js'], {read: false});
 
//   return target.pipe(inject(sources))
//     .pipe(gulp.dest('./application/views/templates/'));
// });
