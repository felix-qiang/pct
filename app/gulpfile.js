var gulp = require('gulp'),
    less = require("gulp-less"),
    minifyCss = require('gulp-minify-css'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    fileinclude = require('gulp-file-include'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');      //文件名命名

gulp.task('imagemin', function(){
    return gulp.src('./img/*.{png,jpg,gif,ico}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
})
gulp.task('mainjs', function () {
    gulp.src('./js/*.js')
        .pipe(concat("main.js"))           //合并
        .pipe(gulp.dest("dist/js"))          //输出保存
        .pipe(rename("main.min.js"))          //重命名
        .pipe(uglify())                        //压缩
        .pipe(gulp.dest("dist/js"));
});
gulp.task('compile-less', function () {
    gulp.src('./less/main.less')
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(less())
        .pipe(gulp.dest('dist/css'))
        .pipe(concat('main.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('fileinclude', function () {
    gulp.src('page/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist/page'));
});
gulp.task('watch', function () {
    gulp.watch('less/**/*.less', ['compile-less']); //当所有less文件发生改变时，调用testLess任务
    gulp.watch('', ['assetjs']); //当所有less文件发生改变时，调用testLess任务
    gulp.watch('page/**/*.html', ['fileinclude']);
});


