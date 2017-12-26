/**
 * Holds links to Main and Settings
 */


const sideBar = {
    controller: function () {
        this.inputValue = m.prop("")
    },

    view: function (ctrl) {
        const m = require("mithril")
        const btnMain = require('./btnMain')
        return m("div", {
            class: ['sidebar']
        },
            btnMain.view()
            )

    }
}

module.exports = sideBar