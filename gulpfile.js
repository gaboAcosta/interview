
var gulp = require('gulp');
require('gulp-import-tasks')('gulp');

gulp.task('default', ['server', 'client', 'swagger']);