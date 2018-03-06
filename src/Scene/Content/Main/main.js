'use strict';

/**
 * This is the main window, where the main board is
 */
require('./main.scss')

const Main = {

	view: function(vnode) {
		const chessboard 	= require('./Chessboard')
		const engine	 	= require('./ChessEngine')
		const pgn_viewer 	= require('./PGNViewer/pgnviewer')

		const mBoard  = vnode.attrs.m(chessboard, vnode.attrs)
		const mEngine = vnode.attrs.m(engine, vnode.attrs)
		const mViewer = vnode.attrs.m(pgn_viewer, vnode.attrs)

		return vnode.attrs.m('div', { class:'main view', id: 'content-main' },
            vnode.attrs.m('div', {class: 'main_left'}, mBoard),
            vnode.attrs.m('div', {class: 'main_right'}, mViewer, mEngine)
		)
	}
}

module.exports = Main