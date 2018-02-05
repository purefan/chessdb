'use strict'


import db from './db'

const Settings = {}

/**
 * Gets all the settings from the database
 */
Settings.get = () => {
    db.init()
    const default_settings = {
        available_engines: {
            show_engine_panel: {
                id: 'show_engine_panel',
                type: 'boolean',
                value: true
            },
            add_engine: {
                id: 'add_engine',
                type: 'engine_file_picker'
            },
            manage_engines: {
                id: 'added_engines',
                type: 'list_of_engines',
                value: []
            }

        }

    }

    return new Promise((resolve, reject) => {
        db.get('settings')
            .then((settings) => {
                console.log('real settings', settings)
                resolve(settings.value)
                // resolve(default_settings)
            })
            .catch((err) => {
                if (err.status === 404) {
                    return resolve(default_settings.value)
                }
                reject(err)
            })
    })
}


Settings.set = (setting) => {
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

                console.log(`settings[${setting.category}][${setting.name}] = ${JSON.stringify(setting.value)}`)

                return db.set('settings', settings)
                    .then(resolve)
            })
    })
}
export default Settings