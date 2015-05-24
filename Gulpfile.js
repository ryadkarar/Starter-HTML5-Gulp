/*
	Fichier de configuration Gulp
	Gulpfile
	Par @@AuteurDuProjet
	http://www.ebizproduction.com/
*/

/* A executer dans le terminal : npm install gulp gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-csso gulp-strip-comments gulp-uglify gulp-rename gulp-concat gulp-notify gulp-cache gulp-livereload del --save-dev */

/* Chargement des plugins */

var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	csso = require("gulp-csso"),
	strip = require('gulp-strip-comments'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	replace = require('gulp-regex-replace'),
	notify = require('gulp-notify'),
	cache = require('gulp-cache'),
	livereload = require('gulp-livereload'),
	del = require('del');

/* Traitement des CSS */

gulp.task('styles', function() {
	return(
		sass('assets/src/scss/style.scss', {style: 'nested', lineNumbers: true})
		.on("error", notify.onError(function (error) { return "Erreur : " + error.message; }))
	)
	.pipe(sass()) 
	.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	.pipe(strip())
	.pipe(gulp.dest('assets/dist/css'))
	.pipe(csso())
	.pipe(rename({suffix: '.min'}))
	.pipe(minifycss())
	.pipe(gulp.dest('assets/dist/css'))
	.pipe(notify({ message: 'Gulp : Traitement des CSS achevé' }));
});

/* Traitement des JS */

gulp.task('scripts', function() {
	return gulp.src('assets/src/js/*.js')
	.pipe(concat('global.js'))
	.pipe(gulp.dest('assets/dist/js'))
	.pipe(rename({suffix: '.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('assets/dist/js'))
	.pipe(notify({ message: 'Gulp : Traitement des JS achevé' }));
});

/* Observation */

gulp.task('watch', function() {
	gulp.watch('assets/src/scss/**/*.scss', ['styles']);
	gulp.watch('assets/src/js/*.js', ['scripts']);
	livereload.listen();
	gulp.watch(['assets/dist/**']).on('change', livereload.changed);
});

/* Tâches par défaut */

gulp.task('default', function() {
	gulp.start('styles', 'scripts', 'watch');
});