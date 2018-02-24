/**
 * This is just the button to enable the Scene "Main"
 */

const btnMain = {
    view: function (vnode) {
        return vnode.attrs.m("button", {
            class: vnode.attrs.settings.active_scene.value === 'Main' ? 'active' : '',
            onclick: () => {
                vnode.attrs.settings.active_scene = { value: 'Main', hidden: true }
            }
        }, 'Main'
        )
    }
}

module.exports = btnMain