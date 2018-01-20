'use strict'

const Settings = {
    settings: [1,2,3],
    oninit: function (vnode) {
        const self = this

        vnode.attrs.settings
            .get()
            .then((what) => {
                vnode.state.settings = what
                console.log('changed self.settings for', what)
                vnode.attrs.m.redraw()
            })
    },
    build_settings: (vnode) => {
        const self = this
        const categories = Object.keys(vnode.state.settings)
        const v_settings = []
        // https://codepen.io/ChidoYo/pen/mvFct?editors=1100
        return categories.map((category) => {
            console.log('category:', category)
            return Object.keys(vnode.state.settings[category]).map((setting_name) => {
                const setting = vnode.state.settings[category][setting_name]
                if (setting.type === 'boolean') {
                    return vnode.state.build_onoff_switch(vnode, setting)
                }
            })
        })

    },
    build_onoff_switch: (vnode, setting) => {
        return vnode.attrs.m('div', {class: 'onoffswitch'},
            vnode.attrs.m('input', {
                type: 'checkbox',
                name: 'onoffswitch',
                class: 'onoffswitch-checkbox',
                id: 'onoffswitch',
                checked: true,
                onclick: () => { console.log('clicked')}
            }),
            vnode.attrs.m('label', {
                class: 'onoffswitch-label',
                for: 'myonoffswitch'
            },
                vnode.attrs.m('span.onoffswitch-inner'),
                vnode.attrs.m('span.onoffswitch-switch')
            )
        )
    },
    view: (vnode) => {
        console.log('this', vnode.state.settings, this)

        return vnode.attrs.m('div', {class: 'sasasa', onclick: () => {console.log('sasasasa')}},
            'This is settings'
            , vnode.state.build_settings(vnode)
        )
    }
}

module.exports = Settings