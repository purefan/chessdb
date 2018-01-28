'use strict'


const btnSettings = {
    controller: function (ctrl) {
    },

    view: function (ctrl) {
        return ctrl.attrs.m("button", {
            class: ctrl.attrs.active_scene === 'Settings' ? 'active' : '',
            onclick: () => {
                    ctrl.attrs.active_scene = "Settings"
                }
            }, 'Settings'
        )
    }
}

module.exports = btnSettings