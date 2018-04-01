/**
 * This is just the button to enable the Scene "Main"
 */

const btnToggle = {
    oninit: (vnode) => {
        vnode.state.uciengine_state = 'idle'
        // get the current state of the engine
        vnode.state.ipc = require('electron').ipcRenderer
        vnode.state.ipc.send('uciengine-status')
        vnode.state.ipc.on('uciengine-status', function(event, message){
            console.log('uciengine-status', message)
            vnode.state.uciengine_state = message.state
            setTimeout(vnode.attrs.m.redraw)
        })
    },
    view: function (vnode) {
        return vnode.attrs.m('button', {
            class: '',
            onclick: () => {
                const fen = vnode.attrs.chessboard.getFen()
                console.log('Clicked btnToggle with fen ' + fen)
                vnode.state.ipc.send('uciengine-analyse', fen)
            }
        },
        vnode.state.uciengine_state /* === 'idle' ? 'Go' : 'Stop' */
        // 'btnToggle'
    )
    }
}


module.exports = btnToggle