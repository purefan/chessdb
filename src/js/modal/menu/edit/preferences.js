// This implements the functionality triggered inside modal
// In renderer process (web page).
function do_test() {
    const ipcRenderer = require('electron').ipcRenderer;
    //console.log(ipcRenderer.sendSync('synchronous-message', 'ping')); // prints "pong"

    // ipcRenderer.on('from-the-main-process', function (event, arg) {
    //     console.log(arg); // prints "pong"
    // });

    ipcRenderer.send('from-a-modular-browser', 'modal.test', {arg1: 'val1', arg2: 'val2'});
    console.log('Sent from-a-modular-browser')
    /* setTimeout(function() {
        console.log('triggering timeout')
    }, 4000) */
}