
require('./sidebar.scss')

const Sidebar = {
    view: function view(vnode) {
        const btnMain       = require('./btnMain/btnMain')
        const btnSettings   = require('./btnSettings/btnSettings')

        return vnode.attrs.m(
            "div", {
                class: ['sidebar']
            },
            vnode.attrs.m(btnMain, vnode.attrs),
            vnode.attrs.m(btnSettings, vnode.attrs)
        )
    }
}


module.exports = Sidebar