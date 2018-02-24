'use strict'


const btnSettings = {
    view: function (vnode) {
        return vnode.attrs.m("button", {
            class: vnode.attrs.settings.active_scene.value === 'Settings' ? 'active' : '',
            onclick: () => {
                vnode.attrs.settings.active_scene = { value: 'Settings', hidden: true }
            }
        }, 'Settings'
        )
    }
}

module.exports = btnSettings