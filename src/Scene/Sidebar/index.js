
const Sidebar = {
    controller: function controller(ctrl) {
        this.inputValue = ctrl.attrs.m.prop("aloha")
    },

    view: function view(ctrl) {
        const btnMain = require('./btnMain')
        return ctrl.attrs.m(
            "div", {
                class: ['sidebar']
            },
            ctrl.attrs.m(btnMain, ctrl.attrs),
            ctrl.attrs.m('div', this.inputValue)
        )
    },

    oninit: function oninit(ctrl) {
        console.log('[sidebar::onInit]', ctrl, ctrl.state)
        ctrl.attrs.log('yeah')
    }
}


module.exports = Sidebar