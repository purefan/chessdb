'use strict'

import db from './db'
const m = require('mithril')

const Settings = {
    settings: {
        available_engines: {
            show_engine_panel: {
                id: 'show_engine_panel',
                type: 'boolean',
                value: true
            },
            add_engine: {
                id: 'add_engine',
                type: 'engine_file_picker',
                value: 'hidden'
            },
            manage_engines: {
                id: 'added_engines',
                type: 'list_of_engines',
                value: []
            }

        },
        active_scene: {
            value: 'Main'
        }
    },

    init: function() {
        db.init()
        const self = this
        db.get('settings').then((settings) => {
            self.settings = settings.value
            setTimeout(m.redraw)
            self.eventer.emit('vendor.purefan.settings.init', settings.value)
            // document.body.dispatchEvent(new Event('vendor.purefan.settings.init', settings.value))
        })
        return this
    }
}

Settings.init()
const proxied = new Proxy(Settings, {
    set(target, name, value) {
        // Allow setting the eventer as a property
        if (name === 'eventer') {
            target.eventer = value
            return true
        }
        if (value.category && !target.settings[value.category]) {
            target.settings[value.category] = {}
        }

        if (value.category && !target.settings[value.category][name]) {
            target.settings[value.category][name] = value
        }

        if (!value.category) {
            target.settings[name] = value
        }

        db.set('settings', target.settings)
        setTimeout(m.redraw)
        return true
    },

    get(target, what) {
        if (what === 'all') {
            return target.settings
        }
        return target.settings[what]
    }
})

export default proxied