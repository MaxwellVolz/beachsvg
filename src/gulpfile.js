// libraries
var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');

var testData = require('./src/data/data');


gulp.task('default',function(){
	var templateData = {
		foo: "Hello",
		bar: "World",
		test: testData
	},
	options = {
		// ignorePartials : ignores any unknown partials. Useful if you only want to handle part of the file
		ignorePartials: true,
		// partials : Javascript object that will fill in partials using strings
		partials: {
			"<footer>foot here.</footer>"
		},
		// batch : Javascript array of filepaths to use as partials
		batch: ['./src/partials'],
		// helpers: javascript functions to stand in for helpers used in the handlebars files
		helpers: {
			capitals: function(str){
				return str.toString().toUpperCase();
			}
		}
	}

}