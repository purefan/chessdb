const log = (what, level) => {
    console.log(`[logger]`, what)
}

log.error = function error(what, level) {
    console.error(what)
}

// define default values for the setting
/* libase.log.setting = {
    levels : {
        OFF: 0,     // No logging at all
        INFO: 1,    // High level - End user info, suitable for GUI display
        DEBUG: 2,   // Low Level - Dev user info, suitable for console
        TRACE: 4    // Low level - Archive/parser info, suitable for log managers
    },
    default_level: 4
} */

module.exports = log