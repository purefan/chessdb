'use strict'

require('./content.scss')
const Content = {
    view: (ctrl) => {
        console.log('Checking ctrl in Content', ctrl)
        const Main      = require('./Main/main.js')
        const Settings  = require('./Settings/settings.js')
        console.log('Active scene: ', ctrl)
        return ctrl.attrs.m(
            'div', {class: 'content'},
            ctrl.attrs.active_scene === "Main"      ? ctrl.attrs.m(Main, ctrl.attrs) : null,
            ctrl.attrs.active_scene === "Settings"  ? ctrl.attrs.m(Settings, ctrl.attrs) : null
        )
    }
}

module.exports = Content