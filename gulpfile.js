// libraries
var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();

// helpers
var helpers = require('./src/helpers/utilities');

var data = require('./src/data/data.json'); // example of json file
var data = require('./src/data/data.js');

gulp.task('default', ['build']);

gulp.task('build', function () {
    var templateData = {
        firstName: 'Rip',
        paths: data.paths
    },
    options = {
    	// ignorePartials : ignores any unknown partials. Useful if you only want to handle part of the file
    	// ignores the unknown footer2 partial in the handlebars template, defaults to false 
        ignorePartials: true, 
        // partials : Javascript object that will fill in partials using strings
        partials : {
            footer : '<footer>footer<sup>3</sup></footer>'
        },
        // batch : Javascript array of filepaths to use as partials
        batch : ['./src/partials'],
        // helpers: javascript functions to stand in for helpers used in the handlebars files
        helpers : {
            capitals : function(str){
                return str.toString().toUpperCase();
            },
            times : function(n, block) {
			    var accum = '';
			    for(var i = 0; i < n; ++i)
			        accum += block.fn(i);
			    return accum;
			}
		}
    }
 
    return gulp.src('src/index.handlebars')
        .pipe(handlebars(templateData, options))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
	      stream: true
	    }));
});

gulp.task('watch', ['build','browserSync'], function(){
	gulp.watch(['src/partials/*.handlebars','src/*.handlebars','src/data/*.js'],['build']);
});

// Localhost server
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
  })
})