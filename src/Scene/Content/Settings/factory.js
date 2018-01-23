'use strict'

const Factory = {
    build_setting: (attrs, setting) => {
        console.log('setting', setting.type === 'boolean')
        if (setting.type === 'boolean') {
            return Factory.make_boolean(attrs, setting)
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
    }
}

module.exports = Factory