'use strict'
/**
 * Displays the output of a chess engine
 */
const engine_panel = {
    oninit: (vnode) => {
        vnode.state.engine = { state: 'uninitialized' }
        const self = this
        const settings = vnode.attrs.settings.all
        let engine_settings = find_default_engine(vnode.attrs.settings.all)
        if (!engine_settings) {
            console.log(vnode)
            vnode.attrs.eventer.on('vendor.purefan.settings.init', () => {
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
            if (!vnode.state.engine) {
                return
            }
            vnode.state.engine = new vnode.attrs.UCIEngine(engine_settings.path)
            vnode.state.engine.eventer = vnode.attrs.eventer
            vnode.attrs.eventer.on('vendor.purefan.engine.info', (what) => {
                console.log('Content::Main::ChessEngine::info', what)
                self.engine_output = what
                setTimeout(vnode.attrs.m.redraw)
            })
            setTimeout(vnode.attrs.m.redraw)

            vnode.attrs.eventer.on('libase.board.changed', (move) => {
                if (vnode.state.engine && vnode.state.engine.state !== 'idle') {
                    vnode.state.engine.analyze(move.fen)
                }
            })
        }
    },
    view: (vnode) => {
        const btn_toggle_analysis = vnode.attrs.m('button', {
            onclick: () => {
                if (vnode.state.engine.state === 'idle') {
                    vnode.state.engine.analyze(vnode.attrs.ground.getFen())
                }
            }
        }, vnode.state.engine.state/*  === 'idle' ? 'start' : 'stop' */)

        const display_moves = require('./linesDisplayer')

        const btn_configure = vnode.attrs.m('button', 'configure')
        const toolbar       = vnode.attrs.m('div', {class: 'toolbar'},
            [
                btn_toggle_analysis
                , btn_configure
        ]
        )
        return vnode.attrs.m('div', {class: 'chess-engine'}, toolbar, vnode.attrs.m(display_moves, vnode.attrs))
    }
}

module.exports = engine_panel