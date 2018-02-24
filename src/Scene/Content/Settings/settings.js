'use strict'

require('./settings.scss')

const Settings = {
    settings: [],
    oninit: function (vnode) {
        vnode.state.settings = vnode.attrs.settings.all
        setTimeout(vnode.attrs.m.redraw)
    },
    build_settings: (vnode) => {
        const factory = require('./factory')
        const layout = vnode.attrs.m('div',
            {
                class: 'table'
            },
            factory.process_settings(vnode.attrs, vnode.state.settings)
        )
        return layout
    },
    view: (vnode) => vnode.attrs.m('div', vnode.state.build_settings(vnode))
}

module.exports = Settings