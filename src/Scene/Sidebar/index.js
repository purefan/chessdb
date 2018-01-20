
const Sidebar = {
    controller: function controller(ctrl) {},

    view: function view(ctrl) {
        const btnMain       = require('./btnMain')
        const btnSettings   = require('./btnSettings/btnSettings')

        return ctrl.attrs.m(
            "div", {
                class: ['sidebar']
            },
            ctrl.attrs.m(btnMain, ctrl.attrs),
            ctrl.attrs.m(btnSettings, ctrl.attrs)
        )
    },

    oninit: function oninit(ctrl) {
        ctrl.attrs.log('yeah')
    }
}


module.exports = Sidebar