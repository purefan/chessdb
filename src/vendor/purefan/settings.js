'use strict'


import db from './db'

const Settings = {}

/**
 * Gets all the settings from the database
 */
Settings.get = () => {
    db.init()
    const default_settings = {
        lang_engine: {
            show_engine_panel: {
                id: 'show_engine_panel',
                type: 'boolean',
                value: true
            }
        }
    }
    return new Promise((resolve, reject) => {
        db.get('settings')
            .then((settings) => {
                resolve(settings.value)
            })
            .catch((err) => {
                if (err.status === 404) {
                    return resolve(default_settings.value)
                }
                reject(err)
            })
    })
}


Settings.set = (name, setting) => {
    const self = this
    return new Promise((resolve, reject) => {
        Settings.get()
            .then((settings) => {
                if (!settings[setting.category]) {
                    settings[setting.category] = {}
                }

                if (!settings[setting.category][setting.name]) {
                    settings[setting.category][setting.name] = setting
                } else {
                    settings[setting.category][setting.name].value = setting.value
                }
                return db.set('settings', settings)
                    .then(resolve)
            })
    })
}
export default Settings