/**
 * This is just the button to enable the Scene "Main"
 */

const test = {
    controller: function (ctrl) {
        this.inputValue = ctrl.attrs.m.prop("")
    },

    view: function (ctrl) {
        return ctrl.attrs.m("button", {
                onclick: () => {
                    ctrl.attrs.log('in the button onclick')
                }
            }, 'Main'
        )
    }
}

module.exports = test