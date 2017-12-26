'use strict'
/**
 * Displays the output of a chess engine
 */
const m = require('mithril')

const engine_panel = () =>  {
    const btn_start = m('button', 'start')
    const btn_configure = m('button', 'configure')
    const toolbar = m('div', btn_start, btn_configure)
    return m('div.display_chess_engine', '-- chess engine -- ', toolbar)
}

module.exports = {
    view: engine_panel
}