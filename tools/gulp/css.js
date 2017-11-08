const path = require('path')
const watch = require('gulp-watch')
const sass = require('gulp-sass');
const concat = require('gulp-concat')
const gap = require('gulp-append-prepend')

function css() {
    const src_css = path.join(this.settings.path.src, 'css') + path.sep + '**.*ss'
    watch(src_css, () => {
        console.log('Reloading styles')
        this
            .src([src_css, '!' + path.join(this.settings.path.src,'css','palette.scss')])
            .pipe(gap.prependFile(path.join(this.settings.path.src,'css','palette.scss')))
            .pipe(sass(/* {outputStyle: 'compressed'} */).on('error', sass.logError))
            .pipe(concat('main.css'))
            .pipe(this.dest(path.join(this.settings.path.dist)))
    })
}

module.exports = css