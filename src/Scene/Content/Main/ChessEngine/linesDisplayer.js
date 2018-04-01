// Listens to feedback from the engine and displayes the best moves
// Allows double clicking to play that move on the board
require('./linesDisplayer.scss')

const LinesDisplayer = {
    oninit: function (vnode) {
        vnode.state.ipc = require('electron').ipcRenderer
        this.engine_output = {1: {pv:[], score: {value: ''}}}
        vnode.state.ipc.on('vendor.purefan.engine.info', (event, what) => {
            this.engine_output[what.multipv] = what
            console.log('-- linesDisplayer', what)
            setTimeout(vnode.attrs.m.redraw)
        })
    },
    view: function (vnode) {
        // make it a table
        const lines = []
        Object.keys(this.engine_output).forEach((index) => {
            const line = this.engine_output[index]
            console.log('line', line)
            const td_score = vnode.attrs.m('td', line.score.value)
            const td_moves = vnode.attrs.m('td', line.pv.join(' '))
            const tr = vnode.attrs.m('tr', td_score, td_moves)
            lines.push(tr)
        })

        const viewer = vnode.attrs.m('table', {
            class: 'engine-lines-displayer'
        },lines)
        return viewer
    }
}

module.exports = LinesDisplayer