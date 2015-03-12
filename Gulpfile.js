var config = {
    livereload: {
        port: 35729
    },

    src: {
        root: './src',
        index: './src/index.js',
        scripts: [
            './src/**/*.js'
        ]
    }
};



// ======= Gulp
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('default', function() {
    gulp.start('connect');
});

gulp.task('connect', function() {
    $.nodemon({
        script: config.src.index,
        ext: 'js json',
        ignore: []
    })
        .on('chage', [])  // Tasks like 'lint' before to restart
        .on('restart', function() {
            console.log('server restarted');
        });
});

gulp.task('watch', function() {

});
