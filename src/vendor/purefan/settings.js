'use strict'


import db from './db'

const Settings =  {}

/**
 * Gets all the settings from the database
 */
Settings.get = () => {
    db.init()
    const default_settings = {
        lang_engine: {
            show_engine_panel: {
                type: 'boolean',
                default: true
            }
        }
    }
    return new Promise((resolve, reject) => {
        db.get('settings')
            .then(resolve)
            .catch((err) => {
                if (err.status === 404) {
                    return resolve(default_settings)
                }
                reject(err)
            })
    })
}

export default Settings