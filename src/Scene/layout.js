'use strict';

/**
 * This is the main window, the parent "frame".
 * It divides the screen in "Sidebar" and "Main"
 * Sidebar contains "links" to activate different views, the list of Views is
 *      - Main: Shows the board, database, games and engine
 *      - Settings: Configuration options
 *      - Help
 */

// CSS
require('./layout.scss')

// Libraries
const m 		= require("mithril")
const log 		= require('../js/core/logger')

// Components
const Content   = require('./Content/content.js')
const Sidebar 	= require('./Sidebar')

const layout = {
	controller: function(){
		this.inputValue = m.prop("")
	},

	view: function(vnode) {
		const attrs = {
			log: log,
			m: m
		}
		return m(
			"div"
			, { class: 'vogula'}
			, m(Sidebar, attrs)
			, m(Content, attrs)
		)
	}
}

m.mount(document.body, {
	view: layout.view
})