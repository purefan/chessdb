'use strict';

/**
 * This is the main window, where the main board is
 */
require('./main.scss')
/*
const m = require('mithril')
 */
//const games_list = require('./GamesList')

const Main = {
	controller: function(ctrl) {
		this.inputValue = ctrl.attrs.m.prop('')
	},

	view: function(ctrl) {
		const engine	 	= require('./ChessEngine')
		const chessboard 	= require('./Chessboard')

		const mBoard  = ctrl.attrs.m(chessboard, ctrl.attrs)
		const mEngine = ctrl.attrs.m(engine, ctrl.attrs)

		return ctrl.attrs.m('div', { class:'main view' },
            ctrl.attrs.m('main_left', {}, mBoard),
            ctrl.attrs.m('main_right', {}, mEngine)
		)
	}
}

module.exports = Main