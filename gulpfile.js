const gulp          = require('gulp')
const settings      = require('./package.json').settings
const tools         = require('require-dir')(settings.path.gulp.tools)
settings.path.root  = __dirname
gulp.settings       = settings

// Load all the tasks
Object.keys(tools).every((tool_name) => gulp.task(tool_name, tools[tool_name]))

gulp.task('watch', ['html', 'css', 'js'])