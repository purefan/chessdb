const path = require('path')
const watch = require('gulp-watch')
const sass = require('gulp-sass');
const concat = require('gulp-concat')

function css() {
    const src_css = path.join(this.settings.path.src, 'css') + path.sep + '**.*ss'
    watch(src_css, () => {
        console.log('Reloading styles')
        this
            .src(src_css)
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(concat('main.css'))
            .pipe(this.dest(path.join(this.settings.path.dist)))
    })
}

module.exports = css