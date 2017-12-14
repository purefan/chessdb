/**
*   This is the basic functionality needed by the actual modular
*   It is injected into every modal window to fake a vogula object
*   But it should be seen as a bridge between the modal and the main renderer
*   Any function named `init` present in the modals will be called automatically
*/
const {ipcRenderer} = require('electron');

const vogula_proxy_handler = {
    get: function(target, module_name) {
        const fake_method = {
            get: function(target, method_name) {
                return function() {
                    ipcRenderer.send('from-a-modular-browser', `${module_name}.${method_name}`, arguments);
                }
            }
        }
        const method_proxy = new Proxy({}, fake_method)
        return method_proxy;
    }
};

const vogula = new Proxy({}, vogula_proxy_handler);