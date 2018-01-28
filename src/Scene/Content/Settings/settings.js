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
        const factory = require('./factory')
        const self = this
        const categories = Object.keys(vnode.state.settings)
        //
        const all = categories.map((category) => {
            return Object.keys(vnode.state.settings[category]).map((setting_name) => {
                const setting = vnode.state.settings[category][setting_name]
                setting.name = setting_name
                setting.category = category

                const setting_vnode = factory.build_setting(vnode.attrs, setting)
                if (!setting_vnode) {
                    return null
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
        console.log('all', all)
        return all
    },
    view: (vnode) => {
        console.log('this', vnode.state.settings, this)

        return vnode.attrs.m('div', {class: 'sasasa'},
            vnode.state.build_settings(vnode)
        )
    }
}

module.exports = Settings