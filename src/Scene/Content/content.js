'use strict'

require('./content.scss')
const Content = {
    view: (vnode) => {
        const Main      = require('./Main/main')
        const Settings  = require('./Settings/settings')

        const which     = vnode.attrs.settings.active_scene.value

        return vnode.attrs.m(
            'div', {class: 'content'},
            which === "Main"      ? vnode.attrs.m(Main, vnode.attrs) : null,
            which === "Settings"  ? vnode.attrs.m(Settings, vnode.attrs) : null
        )
    }
}

module.exports = Content