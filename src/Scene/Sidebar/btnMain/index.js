/**
 * This is just the button to enable the Scene "Main"
 */


const test = {
    controller: function () {
        this.inputValue = m.prop("")
    },

    view: function (ctrl) {
        const m = require('mithril')
        return m("button", {

        }, 'Main'
        )
    }
}

module.exports = test