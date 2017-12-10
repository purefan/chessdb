/**
 * Watches for html files to change and rebuilds the dist/index.html accordingly
 */
const path = require('path')
const watch = require('gulp-watch')
const jade = require('gulp-jade')
// const del = require('node-delete')
const jade_concat = require('gulp-jade-template-concat');
const del = require('del')
const debug = require('gulp-debug')
const fs = require('fs')
/**
 * `this` points to the gulp object
 */
function html() {
    const src_core_jade = path.join(this.settings.path.src, 'html', 'core') + path.sep + '**.jade'
    const src_modals_jade = path.join(this.settings.path.src, 'html', 'modals') + path.sep + '**' + path.sep + '**.jade'

    const watch_jade_core_files = () => {
        console.log(`[html] Reloading templates from ${src_core_jade}`)
        const core_files = []
        const stream = this
            .src(src_core_jade)
            .pipe(debug({title: 'core::jade'}))
            .pipe(jade({
                pretty: true
            }))
            // .pipe(jade_concat('index.html', {templateVariable:"templates"}))
            .pipe(this.dest(this.settings.path.dist))
        stream.on('end', () => {
            del(
                [path.join(this.settings.path.dist, '*.html'),
                '!' + path.join(this.settings.path.dist,'index.html')]
            ).then( path => console.log('Deleted', path))
        })
    }

    const watch_modals = () => {
        const stream = this
            .src(src_modals_jade)
            .pipe(jade({pretty: true}))
            .pipe(this.dest(path.join(this.settings.path.dist,'modals')))
    }

    watch(src_core_jade, watch_jade_core_files)
    watch(src_modals_jade, watch_modals)
}

module.exports = html