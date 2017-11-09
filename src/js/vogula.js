'use strict';
// vogula.js
let vogula = {
    init: () => {
        console.log('in vogula.init', vogula)
        vogula.menu.init()

    }
}

window.addEventListener('load', () => {
    vogula = Object.freeze(vogula)
    vogula.init()
}, false);


