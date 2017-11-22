'use strict';
// vogula.js
let vogula = {
    init: () => {
        vogula.menu()
        vogula.db.init()
    }
}

window.addEventListener('load', () => {
    vogula = Object.freeze(vogula)
    vogula.init()
}, false);


