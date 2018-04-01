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
            vnode.state.uciengine_state = message.state
            setTimeout(vnode.attrs.m.redraw)
        })

        vnode.attrs.eventer.on('libase.board.changed', () => {
            if (vnode.state.uciengine_state === 'analysing') {
                const fen = vnode.attrs.chessboard.getFen()
                vnode.state.ipc.send('uciengine-analyse', fen)
            }
        })
    },
    view: function (vnode) {
        return vnode.attrs.m('button', {
            class: '',
            onclick: () => {
                if (vnode.state.uciengine_state === 'idle') {
                    // activate
                    const fen = vnode.attrs.chessboard.getFen()
                    console.log('Clicked btnToggle with fen ' + fen)
                    vnode.state.ipc.send('uciengine-analyse', fen)
                } else {
                    // deactivate
                    vnode.state.ipc.send('uciengine-stop')
                }

            }
        },
        vnode.state.uciengine_state /* === 'idle' ? 'Go' : 'Stop' */
        // 'btnToggle'
    )
    }
}


module.exports = btnToggle