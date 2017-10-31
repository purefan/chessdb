/**
 * Watches for html files to change and rebuilds the dist/index.html accordingly
 */
const path = require('path')
 /**
  * this points to the gulp object
  */
function html() {
    this
        .src(path.join(this.settings.path.src, 'html') + path.sep + '*.html')
        .pipe(this.dest(path.join(this.settings.path.dist, 'index.min.html')))
}
module.exports = html