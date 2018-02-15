'use strict'
/**
 * Displays the output of a chess engine
 */
const m = require('mithril')

const engine_panel = {
    oninit: (vnode) => {
        console.log('[engine_panel::oninit]')
        vnode.state.engine = { state: 'uninitialized' }
        const settings = vnode.attrs.settings.all
        let engine_settings = find_default_engine(vnode.attrs.settings.all)
        if (!engine_settings) {
            document.body.addEventListener('vendor.purefan.settings.init', () => {
                engine_settings = find_default_engine(vnode.attrs.settings.all)
                prepare_engine(vnode, engine_settings)
        }, {once: true})
        } else {
            prepare_engine(vnode, engine_settings)
        }

        function find_default_engine(settings) {
            if (
                settings &&
                settings.available_engines &&
                settings.available_engines.manage_engines &&
                settings.available_engines.manage_engines.value) {
                    return settings.available_engines.manage_engines.value[0]
                }
            return false
        }

        function prepare_engine (vnode, engine_settings){
            vnode.state.engine = new vnode.attrs.UCIEngine(engine_settings.path)
            vnode.attrs.m.redraw()

            vnode.attrs.eventer.on('libase.board.changed', (move) => {
                console.log('the board changed and I saw it in the panel', move)
                if (vnode.state.engine && vnode.state.engine.state !== 'idle') {
                    console.log('Board changed', vnode.attrs.engine)
                    // Get the FEN from the board
                    vnode.state.engine.analyze(move.fen)
                }
            })
        }
    },
    view: (vnode) => {
        const btn_toggle_analysis = m('button', {
            onclick: () => {
                if (vnode.state.engine.state === 'idle') {
                    // get position from board
                    // send position to engine
                    console.log(vnode.attrs.ground)

                    vnode.state.engine.analyze(vnode.attrs.ground.getFen())
                }

            }
        }, vnode.state.engine.state/*  === 'idle' ? 'start' : 'stop' */)
        const btn_configure = m('button', 'configure')
        const toolbar = m('div', btn_toggle_analysis, btn_configure)
        return m('chess_engine', toolbar)
    }
}

module.exports = engine_panel