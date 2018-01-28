/**
 * This is just the button to enable the Scene "Main"
 */

const btnMain = {
    controller: function (ctrl) {},

    view: function (ctrl) {
        return ctrl.attrs.m("button", {
                class: ctrl.attrs.active_scene === 'Main' ? 'active' : '',
                onclick: () => {
                    ctrl.attrs.active_scene = 'Main'
                }
            }, 'Main'
        )
    }
}

module.exports = btnMain