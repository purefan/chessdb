'use strict';

/**
 * This is the main window, where the main board is
 */
require('./main.scss')

const Main = {

	view: function(vnode) {
		const engine	 	= require('./ChessEngine')
		const chessboard 	= require('./Chessboard')

		const mBoard  = vnode.attrs.m(chessboard, vnode.attrs)
		const mEngine = vnode.attrs.m(engine, vnode.attrs)

		return vnode.attrs.m('div', { class:'main view', id: 'content-main' },
            vnode.attrs.m('div', {class: 'main_left'}, mBoard),
            vnode.attrs.m('div', {class: 'main_right'}, mEngine)
		)
	}
}

module.exports = Main