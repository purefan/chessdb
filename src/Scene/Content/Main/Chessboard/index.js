require('./board.css')
require('./images/pieces/stauton.css')
require('./index.scss')

const Chessboard = {
    view: (ctrl) => {
        console.log('Chessboard ctrl', ctrl.attrs)
        const board_container = ctrl.attrs.m('div', {
            id: 'board_container',
            oncreate: function() {
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
                const ground = chessboard(document.getElementById('board_container'), config)
            }
        })
        const result = ctrl.attrs.m("main", [board_container])
        return result
    }

}

module.exports = Chessboard