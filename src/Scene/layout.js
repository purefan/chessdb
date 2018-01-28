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
import {Settings, DB, Log} from '../vendor/purefan'

// Components
const Content   = require('./Content/content.js')
const Sidebar 	= require('./Sidebar')

const Layout = {
	controller: function(ctrl) {
		this.inputValue = m.prop("")
	},

	view: function(vnode) {
		console.log('redrawing the Layout view',  state)
		return m(
			"div"
			, { class: 'libase'}
			, m(Sidebar, state)
			, m(Content, state)
		)
	}
}

Settings.get()
const state = {
	log: 			Log,
	m: 				m,
	db: 			DB,
	settings:		Settings,
	active_scene: 	'Main' // default
}

m.mount(document.body, Layout)