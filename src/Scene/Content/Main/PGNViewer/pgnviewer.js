require('./pgnviewer.scss')
const PGNViewer = {
    oninit: (vnode) => {
        vnode.attrs.eventer.on('libase.board.changed', (move) => {
            console.log('-- pgnviewer board changed', move, vnode.attrs.chessboard)
            setTimeout(vnode.attrs.m.redraw)
        })
    },
    make_display_for_single_move: (vnode, move) => {
        return vnode.attrs.m('td', {class: 'pgn-viewer-move'}, move)
    },
    view: (vnode) => {
        let moves = 'Moves go here'
        if (vnode.attrs.chessboard) {
            moves = []
            const trs = []
            let temp_move
            const board_moves = vnode.attrs.chessboard.getMoves()
            console.log('board_moves: ', board_moves)
            board_moves.forEach((move) => {
                // we are creating black's move
                if (temp_move) {
                    trs.push(vnode.attrs.m('tr', [vnode.attrs.m('td',(trs.length + 1) + '.'), temp_move, vnode.state.make_display_for_single_move(vnode, move)]))
                    temp_move = ''
                } else {
                    temp_move = vnode.state.make_display_for_single_move(vnode, move)
                }
            })
            if (temp_move) {
                trs.push(vnode.attrs.m('tr', [
                    vnode.attrs.m('td', (trs.length + 1) + '.'),
                    temp_move,
                    vnode.attrs.m('td', '')
                ]))
            }
            moves = vnode.attrs.m('table', trs)
        }
        return vnode.attrs.m('div', {class: 'pgnviewer panel'}, moves)
    }
}

module.exports = PGNViewer