'use strict';

/**
 * This is the main window, the parent "frame"
 */
// require('./../palette.scss')
require('./main.scss')
 // require('../palette.scss')
const m = require("mithril")
const chessboard = require('./Chessboard')
const chess_engine = require('./ChessEngine')
//const games_list = require('./GamesList')

const test = {
	controller: function(){
		this.inputValue = m.prop("")
	},

	view: function(ctrl) {
		return m("div", { class:'main view' },
            m('main_left', chessboard.view()),
            m('main_right', chess_engine.view())
		)
	}
}

module.exports = test