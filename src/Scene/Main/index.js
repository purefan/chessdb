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

console.log('chess engine', chess_engine)
const main = m('div', [chessboard, chess_engine])

const test = {
	controller: function(){
		this.inputValue = m.prop("")
	},

	view: function(ctrl){
		return m("div", { },
            chessboard.view(),
            chess_engine.view(),
			m("h1", "Welcome"),
			m("div.input-group",

					m("span.input-group-addon#addon","Label: "),
					m("input[type=text].form-control",{
						inputValue: "ctrl.inputValue()",
						oninput: m.withAttr("value", "ctrl.inputValue"),
						placeholder: "Edit src/components/example live!"
					}, "")

			)
		)
	}
}

m.mount(document.body, {
    view: test.view
})