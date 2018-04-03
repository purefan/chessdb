// Listens to feedback from the engine and displayes the best moves
// Allows double clicking to play that move on the board
require('./linesDisplayer.scss')

const LinesDisplayer = {
    oninit: function (vnode) {
        vnode.state.ipc = require('electron').ipcRenderer
        // pv is the best line found
        this.engine_output = {1: {pv:[], score: {value: ''}}}
        const chessjs   = require('chess.js')
        vnode.state.formatter = new chessjs()

        vnode.state.ipc.on('vendor.purefan.engine.info', (event, what) => {
            vnode.state.formatter.reset()
            const moves = vnode.attrs.chessboard.getMoves()

            moves.forEach(move => vnode.state.formatter.move(move))
            const engine_moves = what.pv


            const new_moves = engine_moves.map(move => {
                const new_move = vnode.state.formatter.move(move, {sloppy: true})
                new_move.half_move = vnode.state.formatter.history().length
                return new_move
            })

            this.engine_output[what.multipv].pv = new_moves.map(vnode.state.format_line)
            setTimeout(vnode.attrs.m.redraw)
        })
    },
    format_line: (move, idx) => {
        // on board
        const is_white_to_move = move.color === 'w'

        const current_half_move = move.half_move
        const current_full_move = Math.ceil((current_half_move) / 2)

        let separator = ''
        if (idx === 0 && !is_white_to_move) separator = `${current_full_move}...`
        if (is_white_to_move) separator = '.'

        const number_display = is_white_to_move ? current_full_move : ''
        return `${number_display}${separator}${move.san}`
    },
    view: function (vnode) {
        // make it a table
        const lines = []
        Object.keys(this.engine_output).forEach((index) => {
            const line = this.engine_output[index]
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