'use strict';

// vogula.js
let vogula = {
    init: () => {
        const {remote } = require('electron')
        console.log('is it modal', remote.getCurrentWindow())
        if (!remote.getCurrentWindow().isModal()) {
            console.log('Is not modal')
            vogula.menu.init()
            vogula.db.init()
            vogula.setting.init()
            vogula.modal.init()
            vogula.event.init()
        } else {
            console.log('Is modal')
        }

    }
}

window.addEventListener('load', () => {
    vogula = Object.freeze(vogula)
    vogula.init()
}, false);


