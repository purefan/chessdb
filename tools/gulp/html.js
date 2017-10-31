/**
 * Watches for html files to change and rebuilds the dist/index.html accordingly
 */
const path = require('path')
const watch = require('gulp-watch')
const jade = require('gulp-jade')
 /**
  * this points to the gulp object
  */
function html() {
    const src_jade = path.join(this.settings.path.src, 'html') + path.sep + '**.jade'
    watch(src_jade, () => {
        console.log('Reloading templates')
        this
            .src(src_jade)
            .pipe(jade())
            .pipe(this.dest(path.join(this.settings.path.dist)))
    })

}
module.exports = html