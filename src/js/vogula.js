'use strict';
// vogula.js
let vogula = {
    init: () => {
        vogula.menu.init()
        vogula.db.init()
        vogula.setting.init()
    }
}

window.addEventListener('load', () => {
    vogula = Object.freeze(vogula)
    vogula.init()
}, false);


