var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-clean-css');
var ngAnnotate = require('gulp-ng-annotate');
var htmlmin = require('gulp-htmlmin');
var autoprefixer = require('gulp-autoprefixer');
var _ = require('lodash');
var server = require('gulp-server-livereload');


// Load modules
var task = require('./tasks/gulp-task/task');
var taskList = [
  task("client"),
  task("admin")
];




/*
 *=========================
 *      DEFINE GULP TASKS
 *=========================
 */
_.each(taskList, function(worker){
  gulp.task(worker.name +'.js', worker.js({
    gulp: gulp,
    ngAnnotate: ngAnnotate,
    uglify: uglify,
    concat: concat
  }));


  gulp.task(worker.name +'.style', worker.style({
    gulp: gulp,
    sass: sass,
    minifyCss: minifyCss,
    autoprefixer: autoprefixer,
    concat: concat
  }));


  gulp.task(worker.name +'.html', worker.html({
    gulp: gulp,
    htmlmin: htmlmin
  }));


  gulp.task(worker.name +'.copy', worker.copy({
    gulp: gulp
  }));


// Export all tasks to admin task
  gulp.task(worker.name, [worker.name +'.js', worker.name +'.style', worker.name +'.html', worker.name +'.copy']);
});


/*
 *=========================
 *       WATCH CONFIG
 *=========================
 */
gulp.task('watch', function () {
  _.each(taskList, function(worker){
    //Watch admin files
    gulp.watch(worker.paths.js, [worker.name +'.js']);
    gulp.watch(worker.paths.style, [worker.name +'.style']);
    gulp.watch(worker.paths.html, [worker.name +'.html']);
    gulp.watch(worker.paths.html, [worker.name +'.copy']);
  });
});


gulp.task('server', function() {
  _.each(taskList, function(worker, i){

    //Watch admin files
    var path = worker.paths.dest,
        portDefault = 8080  + i,
        livePortDefault = portDefault + taskList.length,
        openBrowser = worker.name === "admin";

    // console.log(path, portDefault, livePortDefault);

    gulp
        .src(path)
        .pipe(server({
          port: portDefault,
          livereload: {
            enable: true,
            port: livePortDefault,
            filter: function (filename, cb) {
              cb(!/\.(sa|le)ss$|node_modules|assets/.test(filename));
            }
          },
          directoryListing: {
            enable: false,
            path: worker.name
          },
          open: openBrowser,
          fallback: '/index.html'
        }));
  });
});





gulp.task('default', _.map(taskList, "name"));
