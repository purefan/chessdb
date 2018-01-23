'use strict'

require('./settings.scss')

const Settings = {
    settings: [1,2,3],
    oninit: function (vnode) {
        const self = this

        vnode.attrs.settings
            .get()
            .then((what) => {
                vnode.state.settings = what
                console.log('changed self.settings for', what)
                vnode.attrs.m.redraw()
            })
    },
    build_settings: (vnode) => {
        const self = this
        const categories = Object.keys(vnode.state.settings)
        const v_settings = []
        //
        return categories.map((category) => {
            return Object.keys(vnode.state.settings[category]).map((setting_name) => {
                const setting = vnode.state.settings[category][setting_name]
                setting.name = setting_name
                setting.category = category
                let setting_vnode = null
                if (setting.type === 'boolean') {
                    setting_vnode = vnode.state.build_onoff_switch(vnode, setting)
                }

                // build the row
                return vnode.attrs.m('div', {class: 'table'},
                    vnode.attrs.m('div', {class: 'table-row'},
                        vnode.attrs.m('div', {class: 'table-left setting-name'}, setting.name),
                        vnode.attrs.m('div', {class: 'table-right setting-value'}, setting_vnode)
                    )
                )
            })
        })

    },
    build_onoff_switch: (vnode, setting) => {
        console.log('--- setting', setting)
        return vnode.attrs.m('div', {class: 'onoffswitch'},
            vnode.attrs.m('input', {
                type: 'checkbox',
                name: 'onoffswitch',
                class: 'onoffswitch-checkbox',
                id: 'onoffswitch',
                onclick: vnode.attrs.m.withAttr('checked', function(value) {
                    console.log('Checked clicked and value', value)
                    setting.value = value
                    vnode.attrs.settings.set(setting.name, setting)
                }),
                checked: !!setting.value
            }),
            vnode.attrs.m('label', {
                class: 'onoffswitch-label',
                for: 'onoffswitch'
            },
                vnode.attrs.m('span.onoffswitch-inner'),
                vnode.attrs.m('span.onoffswitch-switch')
            )
        )
    },
    view: (vnode) => {
        console.log('this', vnode.state.settings, this)

        return vnode.attrs.m('div', {class: 'sasasa'},
            'This is settings'
            , vnode.state.build_settings(vnode)
        )
    }
}

module.exports = Settings