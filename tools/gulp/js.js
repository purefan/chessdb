const path = require('path')
const watch = require('gulp-watch')
const concat = require('gulp-concat')
const debug = require('gulp-debug')
const gap = require('gulp-append-prepend')

function js() {
    const src_js = path.join(this.settings.path.src, 'js', '**') + path.sep + '**.js'
    console.log(`[js] Watching ${src_js}`)
    watch(src_js, () => {
        console.log('Reloading javascript ' + (new Date()))
        this
            .src([src_js, '!' + path.join(this.settings.path.src, 'js', 'vogula.js')])
            .pipe(debug())
            .pipe(concat('vogula.js'))
            .pipe(gap.prependFile(path.join(this.settings.path.src, 'js', 'vogula.js')))


            .pipe(this.dest(path.join(this.settings.path.dist)))
    })
}

module.exports = js