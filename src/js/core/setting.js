'use strict'

vogula.setting = {}

vogula.setting.values = {
    logging: {
        active_level: vogula.setting.logging
    }
}

vogula.setting.init = () => {
    // preload default settings per module
    console.log('vogula::setting::init')
    Object.keys(vogula).forEach((component) => {
        if (component.hasOwnProperty('setting')) {
            console.log(`[Vogula::setting] Preloading default settings for ${compoennt}`, component.setting)
            vogula.setting.values[component] = component.setting
        }
    })
    // load the settings object from the database
    vogula.db.get('setting')
        .then((settings) => {
            vogula.log({'vogula.settings.init::db.get': settings})
            return assign_settings(settings)
        })
        .catch((e) => {
            if (e.status && e.status === 404) {
                return assign_settings({})
            }
            console.error('vogula::setting::init::get settings error', e)
        })

        function assign_settings(settings) {
            vogula.setting.values = Object.assign(vogula.setting.values, settings)
        }
}

vogula.setting.get = (name) => {
    return new Promise((resolve, reject) => {
        const requested_value = vogula.setting.values[name]
        // vogula.log(`vogula.setting.get:: ${name} ==> ` + JSON.stringify(requested_value))
        resolve(requested_value)
    })

}

vogula.setting.set = (name, value) => {
    console.log('vogula.setting.set', arguments)
}