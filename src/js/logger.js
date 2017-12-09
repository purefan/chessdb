vogula.log = (what, level) => {
    vogula.setting.get('log.level')
        .then(log_level => {
            // if ( log_level >= (level || vogula.log.setting.default_level)) {
                const string_level = Object.keys(vogula.log.setting.levels).find(key => vogula.log.setting.levels[key] === level) || 'NotFound'
                const safe_what = JSON.stringify(what)
                console.log(`[${string_level}] ${safe_what}`)
            // }
            })
        .catch((e) => console.error('logger::constructor::error getting setting',e))
}

// define default values for the setting
vogula.log.setting = {
    levels : {
        OFF: 0,     // No logging at all
        INFO: 1,    // High level - End user info, suitable for GUI display
        DEBUG: 2,   // Low Level - Dev user info, suitable for console
        TRACE: 4    // Low level - Archive/parser info, suitable for log managers
    },
    default_level: 4
}
