const path = require('path')
const watch = require('gulp-watch')
const concat = require('gulp-concat')
const debug = require('gulp-debug')
const gap = require('gulp-append-prepend')

function js() {
    const src_core_js = path.join(this.settings.path.src, 'js', 'core') + path.sep + '**.js'
    const src_modal = path.join(this.settings.path.src, 'js', 'modal', '**') + path.sep + '**.js'
    console.log(`[js] Watching ${src_core_js}`)
    console.log(`[js] Watching ${src_modal}`)
    watch(src_core_js, () => {
        console.log('Reloading core javascript ' + (new Date()))
        this
            .src([src_core_js, '!' + path.join(this.settings.path.src, 'js', 'core', 'vogula.js')])
            .pipe(debug({title: 'js::core'}))
            .pipe(concat('vogula.js'))
            .pipe(gap.prependFile(path.join(this.settings.path.src, 'js', 'core', 'vogula.js')))
            .pipe(this.dest(path.join(this.settings.path.dist)))
    })

    watch(src_modal, () => {
        this
            .src([src_modal])
            .pipe(debug({title: 'js::modal'}))
            .pipe(this.dest(path.join(this.settings.path.dist, 'modals', 'js')))
    })
}

module.exports = js