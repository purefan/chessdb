/**
*   This is the basic functionality needed by the actual modular
*   It is injected into every modal window to fake a vogula object
*   But it should be seen as a bridge between the modal and the main renderer
*   Any function named `init` present in the modals will be called automatically
*/
const ipcRenderer = require('electron').ipcRenderer;


const handler = {
    get: function(target, module_name) {
        const fake_method = {
            get: function(target, method_name) {
                return function() {
                    console.log('in a fake function with arguments', arguments)
                    ipcRenderer.send('from-a-modular-browser', `${module_name}.${method_name}`, arguments);
                }
            }
        }
        const method_proxy = new Proxy({}, fake_method)
        return method_proxy;
    }
};

const vogula = new Proxy({}, handler);