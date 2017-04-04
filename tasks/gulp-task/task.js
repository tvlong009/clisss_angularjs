/**
 * Created by GUMI-QUANG on 11/23/16.
 */

module.exports = function(name, dest){

  var task = {
    name: name,
    paths: {
      assets: './' + name + '/assets/**',
      html: ['./' + name + '/**/*.html', '!./' + name + '/assets/**/*.html'],
      js: ['./' + name + '/**/*.js','!./' + name + '/assets/**/*.js'],
      style: ['./' + name + '/**/*.scss', '!./' + name + '/assets/**/*.scss'],
      dest:  dest || './public/' + name
    }
  };



  /*=======================================
   *
   *        BUILD JAVASCRIPT
   *
   *========================================*/
  task.js = function (option) {
    var gulp        = option.gulp,
        ngAnnotate  = option.ngAnnotate,
        uglify      = option.uglify,
        concat      = option.concat;

    return function () {
      console.log("START: Task:" + task.name + ":build js success");
      gulp
          .src(task.paths.js)
          .pipe(ngAnnotate({
            remove: true,
            add: true,
            single_quotes: true
          }))
          .pipe(uglify())
          .pipe(concat('app.min.js'))
          .pipe(gulp.dest(task.paths.dest))
          .on('end', function () {
            console.log("Task:" + task.name + ":build js success");
          })
          .on('error', function() {
            console.log(arguments);
          });
    };
  };



  /*=======================================
   *
   *        BUILD STYLE FOR SCSS
   *
   *========================================*/
  task.style = function (option) {
    var gulp            = option.gulp,
        sass            = option.sass,
        minifyCss       = option.minifyCss,
        autoprefixer    = option.autoprefixer,
        concat          = option.concat;

    return function () {
      console.log("START: Task:" + task.name + ":build scss success");
      gulp
          .src(task.paths.style)
          .pipe(sass())
          .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
          }))
          .pipe(minifyCss({
            keepSpecialComments: 0
          }))
          .pipe(concat('app.min.css'))
          .pipe(gulp.dest(task.paths.dest))
          .on('end', function () {
            console.log("Task:" + task.name + ":build scss success");
          })
          .on('error', function() {
            console.log(arguments);
          });
    };
  };




  /*=======================================
   *
   *        BUILD HTML
   *
   *========================================*/
  task.html = function (option) {
    var gulp        = option.gulp,
        htmlmin     = option.htmlmin;

    return function () {
      console.log("START: Task:" + task.name + ":build html success");

      gulp
          .src(task.paths.html)
          .pipe(htmlmin({collapseWhitespace: true}))
          .pipe(gulp.dest(task.paths.dest))
          .on('end', function () {
            console.log("Task:" + task.name + ":build html success");
          })
          .on('error', function() {
            console.log(arguments);
          });
    };
  };



  /*=======================================
   *
   *        COPY ALL STATIC ASSETS
   *
   *========================================*/
  task.copy = function(option){
    var gulp        = option.gulp;
    return function () {
      console.log("START: Task:" + task.name + ":copy files success");

      gulp
          .src(task.paths.assets)
          .pipe(gulp.dest(task.paths.dest + "/assets"))
          .on('end', function () {
            console.log("Task:" + task.name + ":copy files success");
          })
          .on('error', function() {
            console.log(arguments);
          });
    }
  };


  return task;
};