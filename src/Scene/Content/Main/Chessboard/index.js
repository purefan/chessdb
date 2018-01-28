require('./board.css')
require('./images/pieces/stauton.css')
require('./index.scss')

const Chessboard = {
    set_up_board: function(vnode) {
        const chessboard = require('chessground').Chessground
        const config = {
            events: {
                change: () => { console.log('board on change', arguments)}
            },
            orientation: 'white',
            coordinates: false,
            autoCastle: false,
            addPieceZIndex: false,
            movable: {
                free: true,
                color: 'both',
                dropOff: 'trash'
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
        vnode.ground = chessboard(board_container, config)
    },
    resize_board: (vnode) => {
        // Needs to be scheduled
        setTimeout(() => {
            const boards = document.getElementsByClassName('cg-board-wrap')
            Object.keys(boards).forEach((board) => {
                const this_board = boards[board]
                const container_dimensions = document.getElementsByClassName('content')[0].getBoundingClientRect()
                // which one is smaller (it has to be a square)
                const new_length = container_dimensions.width > container_dimensions.height ? container_dimensions.height : container_dimensions.width
                boards[board].style.width = (new_length * 0.9) + 'px'
                boards[board].style.height = (new_length * 0.9) + 'px'
            })
            // also works but is less accurate: document.body.dispatchEvent(new Event('chessground.resize'))
            vnode.ground.redrawAll()
        }, 1)

    },
    view: (vnode) => {
        const self = this
        const board_container = vnode.attrs.m('div', {
            id: 'board_container',
            oninit: () => {

            },
            oncreate: () => {
                vnode.state.set_up_board(vnode)
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