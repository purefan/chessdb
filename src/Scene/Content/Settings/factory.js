'use strict'

const Factory = {
    process_settings: (attrs, settings) => {
        const categories = Object.keys(settings)

        return categories
            .filter(category => !settings[category].hidden)
            .map((category) => {
            return [
                attrs.m('div', {class: 'table-row section-title'},
                    attrs.m('div', {class: 'table-left'}, attrs.m('h2', category)),
                    attrs.m('div', {class: 'table-right'}, '')),
                Factory.build_rows(attrs,settings[category])]
        })
    },
    build_rows: (attrs, category) => {
        return Object.keys(category).map((setting_name) =>
            attrs.m('div', {class: 'table-row'},
                attrs.m('div', {class: 'table-left'}, setting_name),
                attrs.m('div', {class: 'table-right'}, Factory.build_setting_value(attrs, category[setting_name]))
            )
        )
    },

    build_setting_value: (attrs, setting) => {
        if (setting.type === 'boolean') {
            return Factory.make_boolean(attrs, setting)
        }
        if (setting.type === 'engine_file_picker') {
            return Factory.make_engine_file_picker(attrs, setting)
        }
        if (setting.type === 'list_of_engines') {
            return Factory.make_list_of_engines(attrs, setting)
        }
    },

    make_boolean: (attrs, setting) => {
        return attrs.m('div', {class: 'onoffswitch'},
            attrs.m('input', {
                type: 'checkbox',
                name: 'onoffswitch',
                class: 'onoffswitch-checkbox',
                id: 'onoffswitch',
                onclick: attrs.m.withAttr('checked', function(value) {
                    setting.value = value
                    attrs.settings.set(setting.name, setting)
                }),
                checked: !!setting.value
            }),
            attrs.m('label', {
                class: 'onoffswitch-label',
                for: 'onoffswitch'
            },
                attrs.m('span.onoffswitch-inner'),
                attrs.m('span.onoffswitch-switch')
            )
        )
    },

    /**
     * This is a complex setting with several functionalities
     * @see /src/Scene/Content/Settings/contrib.md
     */
    make_engine_file_picker: (attrs, setting) => {
        return attrs.m('input[type=file]', {
            onchange: (e) => {
                // Run validation
                const file_path = e.target.files[0].path
                // then update the settings object
                const engine = new attrs.UCIEngine(file_path)

                engine.on('ready', () => {
                    console.log('[Settings::factory] Engine is ready', engine, engine.info, engine.info.id)
                    // build setting to save
                    const new_engine = {
                        id: engine.info.id,
                        name: engine.info.name,
                        options: engine.options,
                        path: engine.path_to_engine
                    }

                    attrs.settings.get()
                        .then((settings) => {
                            console.log('[Settings::factory::get]', settings)
                            settings.available_engines.manage_engines.value.push(new_engine)
                            attrs.settings.set({
                                category: 'available_engines',
                                name: 'manage_engines',
                                value: settings.available_engines.manage_engines.value
                            })
                        })
                })
            }
        })

    },

    make_list_of_engines: (attrs, setting) => {
        console.log('make_list_of_engines:', setting.value)
        return setting.value.map((engine) => {
            return [
                attrs.m('div', {class: 'table-row'},
                    attrs.m('div', {class: 'table-left'}, attrs.m('h3', engine.name)),
                    attrs.m('div', {class: 'table-right valign-middle'}, '[delete]')
                ),
                attrs.m('div', {class: 'table-row'},
                    attrs.m('div', {class: 'table-left'}, engine.path),
                    attrs.m('div', {class: 'table-right'}, '')
                ),
                engine.options.map((option) => {
                    return attrs.m('div', {class: 'table-row'},
                        attrs.m('div', {class: 'table-left'}, option.name),
                        attrs.m('div', {class: 'table-row'}, `input type ${option.type}`))
                })
            ]
        })
    }
}

module.exports = Factory