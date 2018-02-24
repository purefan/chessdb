require('./board.css')
require('./images/pieces/stauton.css')
require('./index.scss')

const Chessboard = {
    set_up_board: function (vnode) {
        const chessboard    = require('chessground').Chessground
        const chess_lib     = require('chess.js')
        vnode.state.pgn = new chess_lib()
        function toDests() {
            const dests = {};
            vnode.state.pgn.SQUARES.forEach(s => {
                const ms = vnode.state.pgn.moves({ square: s, verbose: true });
                if (ms.length) {
                    dests[s] = ms.map(m => m.to)
                }
            });
            return dests;
        }
        const config = {
            orientation: 'white',
            coordinates: false,
            autoCastle: false,
            addPieceZIndex: false,
            turnColor: 'white',
            movable: {
                free: true,
                color: 'both',
                dropOff: 'trash',
                events: {
                    after: (orig, dest, meta) => {
                        const valid_move = vnode.state.pgn.move({ from: orig, to: dest })
                        if (!valid_move) {
                            vnode.attrs.ground.set({ fen: vnode.state.pgn.fen() })
                        } else {
                            valid_move.fen = vnode.state.pgn.fen()
                            vnode.attrs.eventer.emit('libase.board.changed', valid_move)
                        }
                    }
                }
            },
            animation: {
                duration: 1000
            },
            premovable: {
                enabled: false
            },
            drawable: {
                enabled: true
            },
            draggable: {
                showGhost: true,
                distance: 0,
                autoDistance: false,
                deleteOnDropOff: true
            },
            selectable: {
                enabled: false
            },
            highlight: {
                lastMove: false
            }
        }
        const board_container = document.getElementById('board_container')
        vnode.attrs.ground = chessboard(board_container, config)
        vnode.attrs.eventer.emit('libase.board.ready')
    },
    resize_board: (vnode) => {
        // Needs to be scheduled
        setTimeout(() => {
            const boards = document.getElementsByClassName('cg-board-wrap')
            Object.keys(boards).forEach((board) => {
                const this_board = boards[board]
                const container_dimensions = document.getElementsByClassName('content')[0].getBoundingClientRect()
                // which one is smaller (it has to be a square)
                const new_length = Math.min(container_dimensions.width, container_dimensions.height)
                const factor = 0.8
                boards[board].style.width = (new_length * factor) + 'px'
                boards[board].style.height = (new_length * factor) + 'px'
            })
            // also works but is less accurate:
            document.body.dispatchEvent(new Event('chessground.resize'))
            // vnode.ground.redrawAll()
        }, 1)

    },
    view: (vnode) => {
        const self = this
        const board_container = vnode.attrs.m('div', {
            id: 'board_container',
            oncreate: () => {

                if (!vnode.attrs.ground) {
                    console.log('----- Not set')
                vnode.state.set_up_board(vnode)

                }
                if (vnode.attrs.ground) {
                    console.log('---- already set')
                }
                console.log('------------------------->>>>>', vnode.attrs.ground)
                vnode.state.resize_board(vnode)
            },
            onupdate: () => {
                vnode.state.resize_board(vnode)
            }
        })
        return board_container
    }

}

module.exports = Chessboard