'use strict'

require('./content.scss')
const Content = {
    view: (ctrl) => {
        console.log('Checking ctrl in Content', ctrl.attrs)
        const Main = require('./Main/main.js')
        return ctrl.attrs.m(
            'div', {class: 'content'},
            ctrl.attrs.m(Main, ctrl.attrs)
        )
    }
}

module.exports = Content