const path = require('path')
const watch = require('gulp-watch')
const concat = require('gulp-concat')

function js() {
    const src_js = path.join(this.settings.path.src, 'js') + path.sep + '**.js'
    watch(src_js, () => {
        console.log('Reloading javascript ' + (new Date()))
        this
            .src(src_js)
            .pipe(concat('vogula.js'))
            .pipe(this.dest(path.join(this.settings.path.dist)))
    })
}

module.exports = js