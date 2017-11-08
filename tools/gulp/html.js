/**
 * Watches for html files to change and rebuilds the dist/index.html accordingly
 */
const path = require('path')
const watch = require('gulp-watch')
const jade = require('gulp-jade')
// const del = require('node-delete')
const jade_concat = require('gulp-jade-template-concat');
const del = require('del')

/**
 * this points to the gulp object
 */
function html() {
    const src_jade = path.join(this.settings.path.src, 'html') + path.sep + '**.jade'
    watch(src_jade, () => {
        console.log('Reloading templates')
        const stream = this
            .src(src_jade)
            .pipe(jade({
                pretty: true
            }))
            // .pipe(jade_concat('index.html', {templateVariable:"templates"}))
            .pipe(this.dest(path.join(this.settings.path.dist)))
        stream.on('end', () => {
            console.log('stream ended, deleting extra html files')
            del(
                [path.join(this.settings.path.dist, '*.html'),
                '!' + path.join(this.settings.path.dist,'index.html')]
            ).then( path => console.log('Deleted', path))
        })
    })

}
module.exports = html