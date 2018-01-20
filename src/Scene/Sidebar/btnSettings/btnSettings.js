'use strict'


const btnSettings = {
    controller: function (ctrl) {
    },

    view: function (ctrl) {
        return ctrl.attrs.m("button", {
                onclick: () => {
                    ctrl.attrs.active_scene = "Settings"
                }
            }, 'Settings'
        )
    }
}

module.exports = btnSettings