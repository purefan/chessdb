'use strict'
/**
 * Displays the output of a chess engine
 */
const engine_panel = {
    oninit: (vnode) => {
        vnode.attrs.engine = { state: 'uninitialized' }

        const settings = vnode.attrs.settings.all
        let engine_settings = find_default_engine(vnode.attrs.settings.all)
        if (!engine_settings) {
            vnode.attrs.eventer.on('vendor.purefan.settings.init', () => {
                engine_settings = find_default_engine(vnode.attrs.settings.all)
                prepare_engine(vnode, engine_settings)
            }, { once: true })
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

        function prepare_engine(vnode, engine_settings) {
            console.log('prepare_engine', engine_settings)
            const ipc = require('electron').ipcRenderer
            ipc.send('uciengine-init', engine_settings)

            vnode.attrs.eventer.on('libase.board.changed', (move) => {
                ipc.send('uciengine-analyze', move.fen)
            })
        }
    },
    view: (vnode) => {
        const btn_toggle_analysis = vnode.attrs.m('button', {
            onclick: () => {
                if (vnode.attrs.engine.state === 'idle') {
                    vnode.attrs.engine.analyze(vnode.attrs.chessboard.getFen())
                }
            }
        }, vnode.attrs.engine.state/*  === 'idle' ? 'start' : 'stop' */)

        const display_moves             = require('./linesDisplayer')
        const new_btn_toggle_analysis   = require('./btnToggle')

        const btn_configure = vnode.attrs.m('button', 'configure')
        const new_toggle    = vnode.attrs.m(new_btn_toggle_analysis, vnode.attrs)
        const toolbar = vnode.attrs.m('div', { class: 'toolbar' },
            [
                // btn_toggle_analysis
                new_toggle
                // vnode.attrs.m(new_btn_toggle_analysis, vnode.attrs)
                , btn_configure
            ]
        )
        return vnode.attrs.m(
            'div',
            { class: 'chess-engine panel' },
            toolbar,
            vnode.attrs.m(display_moves, vnode.attrs)
        )
    }
}

module.exports = engine_panel