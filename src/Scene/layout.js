'use strict';

/**
 * This is the main window, the parent "frame".
 * It divides the screen in "Sidebar" and "Main"
 * Sidebar contains "links" to activate different views, the list of Views is
 *      - Main: Shows the board, database, games and engine
 *      - Settings: Configuration options
 *      - Help
 */


require('./layout.scss')
const m = require("mithril")

const Main = require('./Main')
const Sidebar = require('./Sidebar')
/**
 * @todo Move Sidebar to Sidebar
 */
const test = {
	controller: function(){
		this.inputValue = m.prop("")
	},

	view: function(ctrl) {
		return m("div", { class: 'vogula'},
        Sidebar.view()
        , Main.view()

		)
	}
}

m.mount(document.body, {
    view: test.view
})